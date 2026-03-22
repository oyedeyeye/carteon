import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app';
import { Order } from '../../src/models/Order';
import { PaymentService } from '../../src/services/PaymentService';

jest.mock('../../src/services/PaymentService');

describe('Ordering & Payments Endpoints', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);

        process.env.PAYMENT_WEBHOOK_SECRET = 'test_secret';
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await Order.deleteMany({});
        jest.clearAllMocks();

        (PaymentService.prototype.initializePayment as jest.Mock).mockResolvedValue({
            authorizationUrl: 'https://checkout.paystack.com/test_url',
            reference: 'tx_ref_123',
        });

        (PaymentService.prototype.verifyWebhookSignature as jest.Mock).mockReturnValue(true);
    });

    describe('POST /api/v1/orders', () => {
        it('should create an order and return a payment URL', async () => {
            const orderData = {
                customerData: {
                    name: 'John Doe',
                    email: 'john@example.com',
                    phone: '+2348012345678',
                    address: '123 Test Ave',
                },
                items: [
                    {
                        cardType: 'SMART_ONLY',
                        quantity: 1,
                    },
                ],
                totalAmount: 15000,
            };

            const res = await request(app).post('/api/v1/orders').send(orderData);

            expect(res.status).toBe(201);
            expect(res.body.status).toBe('success');
            expect(res.body.data.paymentUrl).toBe('https://checkout.paystack.com/test_url');

            const order = await Order.findOne({ 'customerData.email': 'john@example.com' });
            expect(order).not.toBeNull();
            expect(order?.paymentStatus).toBe('PENDING');
            expect(order?.transactionReference).toMatch(/^CRT_/);

            expect(PaymentService.prototype.initializePayment).toHaveBeenCalledTimes(1);
        });

        it('should return 400 if validation fails', async () => {
            const res = await request(app).post('/api/v1/orders').send({});
            expect(res.status).toBe(400);
            expect(res.body.status).toBe('error');
        });
    });

    describe('POST /api/v1/webhooks/payment', () => {
        it('should update order status to SUCCESS for a valid webhook event', async () => {
            const order = await Order.create({
                customerData: {
                    name: 'Jane Doe',
                    email: 'jane@example.com',
                    phone: '+2348012345678',
                    address: '123 Test Ave',
                },
                items: [{ cardType: 'COMPLETE_PACKAGE', quantity: 2 }],
                totalAmount: 30000,
                paymentStatus: 'PENDING',
                paymentGateway: 'paystack',
                transactionReference: 'tx_webhook_123',
            });

            const webhookPayload = {
                event: 'charge.success',
                data: {
                    reference: 'tx_webhook_123',
                    status: 'success'
                }
            };

            const res = await request(app)
                .post('/api/v1/webhooks/payment')
                .set('x-paystack-signature', 'valid_signature')
                .send(webhookPayload);

            expect(res.status).toBe(200);

            const updatedOrder = await Order.findById(order._id);
            expect(updatedOrder?.paymentStatus).toBe('SUCCESS');
        });

        it('should return 401 if webhook signature is invalid', async () => {
            (PaymentService.prototype.verifyWebhookSignature as jest.Mock).mockReturnValue(false);

            const res = await request(app)
                .post('/api/v1/webhooks/payment')
                .set('x-paystack-signature', 'invalid_signature')
                .send({ event: 'charge.success' });

            expect(res.status).toBe(401);
        });
    });
});
