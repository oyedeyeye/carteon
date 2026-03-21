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
        const order = await Order.findOne({ transactionReference: reference });
        if (order && order.paymentStatus !== 'SUCCESS') {
            order.paymentStatus = 'SUCCESS';
            await order.save();
            return order;
        }
        return null;
    }
}
