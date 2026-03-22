import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../../src/models/User';

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

describe('User Model Validation', () => {
    it('should successfully create a user with valid data', async () => {
        const validUserData = {
            email: 'john@example.com',
            fullName: 'John Doe',
            phone: '+2348012345678',
            deliveryAddress: '123 Lekki, Lagos',
        };
        const user = new User(validUserData);
        const savedUser = await user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(validUserData.email);
    });

    it('should fail if email is missing', async () => {
        const invalidUser = new User({ fullName: 'John Doe' });
        let error;
        try {
            await invalidUser.save();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect((error as any).errors.email).toBeDefined();
    });

    it('should fail if email format is invalid', async () => {
        const invalidUser = new User({ email: 'invalid-email', fullName: 'John Doe' });
        let error;
        try {
            await invalidUser.save();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect((error as any).errors.email).toBeDefined();
    });
});
