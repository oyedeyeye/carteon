import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../../src/app';
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

beforeEach(async () => {
    await User.deleteMany({});
});

describe('Boundary and Resilience Information Security', () => {
    let oldEnvKey: string | undefined;

    beforeAll(() => {
        oldEnvKey = process.env.ADMIN_API_KEY;
        process.env.ADMIN_API_KEY = 'test_key';
    });

    afterAll(() => {
        if (oldEnvKey) process.env.ADMIN_API_KEY = oldEnvKey;
        else delete process.env.ADMIN_API_KEY;
    });

    it('should sanitize strict database error outputs to standard 500 anomalies', async () => {
        const payload = { email: 'duplicate@constraint.com', fullName: 'Test User' };

        // Write the first user to setup the unique index constraint in Mongo
        await request(app).post('/api/v1/admin/users')
            .set('x-admin-api-key', 'test_key')
            .send(payload);

        // Trigger DB driver index duplicate anomaly by sending the exact same email
        const duplicateRes = await request(app).post('/api/v1/admin/users')
            .set('x-admin-api-key', 'test_key')
            .send(payload);

        expect(duplicateRes.status).toBe(500);
        expect(duplicateRes.body.message).not.toContain('E11000 duplicate key error'); // Secure checks
        expect(duplicateRes.body.message).toBe('Internal server error while creating user');
    });
});
