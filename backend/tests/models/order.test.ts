import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
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

describe('Order Model Validation', () => {
    it('should successfully create an order with valid data', async () => {
        const validOrderData = {
            customerData: {
                name: 'Bob Brown',
                email: 'bob@example.com',
                phone: '+2348030000000',
                address: '456 Island, Lagos',
            },
            items: [
                { cardType: 'SMART_ONLY', quantity: 1 }
            ],
            totalAmount: 15000,
            paymentStatus: 'PENDING',
            paymentGateway: 'Paystack',
            transactionReference: 'REF-123',
        };
        const order = new Order(validOrderData);
        const savedOrder = await order.save();
        expect(savedOrder._id).toBeDefined();
        expect(savedOrder.totalAmount).toBe(15000);
    });

    it('should fail if totalAmount is missing', async () => {
        const invalidOrder = new Order({ customerData: { name: 'Bob' } });
        let error;
        try {
            await invalidOrder.save();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect((error as any).errors.totalAmount).toBeDefined();
    });
});
