import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { OrderService } from '../../src/services/OrderService';
import { Order } from '../../src/models/Order';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Order.deleteMany({});
});

describe('Payment Race Condition Idempotency', () => {
    it('should enforce single-execution updates under heavy concurrent webhook blasts', async () => {
        const orderService = new OrderService();
        const ref = 'CRT_RACE_CON_TEST';

        // Setup initial order
        await Order.create({
            transactionReference: ref,
            paymentStatus: 'PENDING',
            paymentGateway: 'paystack',
            totalAmount: 100,
            items: [],
            customerData: { name: 'Test', email: 'test@test.com', phone: '123', address: 'XYZ' }
        });

        // Simulate identical, perfectly concurrent webhook events hitting the same exact millisecond
        // Since findOneAndUpdate is atomic at the DB level, only EXACTLY ONE will evaluate to true
        const promises = Array.from({ length: 5 }, () => orderService.handleSuccessfulPayment(ref));
        const results = await Promise.all(promises);

        // Count how many promises resolved tightly identifying an update
        const successes = results.filter(res => res !== null);

        // Enforce atomicity limit
        expect(successes.length).toBe(1);
    });
});
