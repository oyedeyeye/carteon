import { Order } from '../models/Order';
import { PaymentService } from './PaymentService';
import { ProductService } from './ProductService';
import crypto from 'crypto';

export class OrderService {
    private paymentService: PaymentService;
    private productService: ProductService;

    constructor() {
        this.paymentService = new PaymentService();
        this.productService = new ProductService();
    }

    async createOrder(orderData: any) {
        // Generate a unique transaction reference
        const reference = `CRT_${crypto.randomBytes(8).toString('hex')}`;

        // 1. Re-calculate the absolute total strictly on the server-side
        const allProducts = await this.productService.getCards();
        let calculatedTotal = 0;

        for (const item of orderData.items) {
            const product = allProducts.find(p => p.cardType === item.cardType);
            if (!product) throw new Error(`Invalid product type: ${item.cardType}`);
            calculatedTotal += product.basePrice * item.quantity;
        }

        // 2. Fail explicitly if there's a price mismatch to prevent confusion/fraud attempts
        if (orderData.totalAmount !== calculatedTotal) {
            throw new Error(`Price manipulation detected: client requested ${orderData.totalAmount}, but server calculated ${calculatedTotal}`);
        }

        const newOrder = new Order({
            ...orderData,
            totalAmount: calculatedTotal,
            paymentStatus: 'PENDING',
            paymentGateway: 'paystack',
            transactionReference: reference,
        });

        await newOrder.save();

        const paymentInit = await this.paymentService.initializePayment({
            amount: calculatedTotal * 100, // Safe backend calculated amount
            email: orderData.customerData.email,
            reference,
            callback_url: process.env.FRONTEND_PAYMENT_SUCCESS_URL || `http://localhost:5173/success`,
        });

        return {
            order: newOrder,
            paymentUrl: paymentInit.authorizationUrl,
        };
    }

    async handleSuccessfulPayment(reference: string) {
        // Atomic findAndUpdate operation eliminates the race condition
        const order = await Order.findOneAndUpdate(
            {
                transactionReference: reference,
                paymentStatus: { $ne: 'SUCCESS' } // Status is implicitly verified before update lock
            },
            {
                $set: { paymentStatus: 'SUCCESS' }
            },
            { returnDocument: 'after' } 
        );

        if (order) {
            // Processing logic happens EXACTLY once here.
            return order;
        }

        // Returns null if the order doesn't exist, OR if it was already updated to SUCCESS by a concurrent request.
        return null;
    }
}
