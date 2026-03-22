import { Order } from '../models/Order';
import { PaymentService } from './PaymentService';
import crypto from 'crypto';

export class OrderService {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    async createOrder(orderData: any) {
        // Generate a unique transaction reference
        const reference = `CRT_${crypto.randomBytes(8).toString('hex')}`;

        const newOrder = new Order({
            ...orderData,
            paymentStatus: 'PENDING',
            paymentGateway: 'paystack',
            transactionReference: reference,
        });

        await newOrder.save();

        const paymentInit = await this.paymentService.initializePayment({
            amount: orderData.totalAmount * 100, // Paystack standard is in minor currency
            email: orderData.customerData.email,
            reference,
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
            { new: true } // Returns the modified document
        );

        if (order) {
            // Processing logic happens EXACTLY once here.
            return order;
        }

        // Returns null if the order doesn't exist, OR if it was already updated to SUCCESS by a concurrent request.
        return null;
    }
}
