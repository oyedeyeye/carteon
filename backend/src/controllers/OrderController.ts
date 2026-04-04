import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { PaymentService } from '../services/PaymentService';

const orderService = new OrderService();
const paymentService = new PaymentService();

export class OrderController {
    async createOrder(req: Request, res: Response) {
        try {
            const orderData = req.body;
            const result = await orderService.createOrder(orderData);

            return res.status(201).json({
                status: 'success',
                message: 'Order created and payment initialized',
                data: {
                    reference: result.order.transactionReference,
                    paymentUrl: result.paymentUrl,
                },
            });
        } catch (error) {
            console.error('Error creating order:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    }

    async verifyPayment(req: Request, res: Response) {
        try {
            const { reference } = req.query;

            if (!reference) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Reference is required',
                });
            }

            const order = await orderService.handleSuccessfulPayment(reference as string);

            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Order not found or already processed',
                });
            }

            return res.status(200).json({
                status: 'success',
                data: order,
            });

        } catch (error) {
            console.error('Error verifying payment:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    }
}

export class WebhookController {
    async handlePaymentWebhook(req: Request, res: Response) {
        try {
            const signature = req.headers['x-paystack-signature'] as string;

            // Map the raw payload captured from express.json verification
            const rawBody = (req as any).rawBody || JSON.stringify(req.body);

            const isValid = paymentService.verifyWebhookSignature(signature, rawBody);
            if (!isValid) {
                return res.status(401).json({ status: 'error', message: 'Invalid signature' });
            }

            const eventData = req.body;

            if (eventData.event === 'charge.success' && eventData.data.status === 'success') {
                const reference = eventData.data.reference;
                await orderService.handleSuccessfulPayment(reference);
            }

            // Always respond 200 to webhooks to acknowledge receipt
            return res.status(200).json({ status: 'success' });
        } catch (error) {
            console.error('Error handling webhook:', error);
            // Even on error, we usually want to acknowledge receipt or let it retry depending on gateway best practices
            return res.status(500).json({ status: 'error', message: 'Internal server error' });
        }
    }
}