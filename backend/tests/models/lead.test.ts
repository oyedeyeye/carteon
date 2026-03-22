import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Lead } from '../../src/models/Lead';

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

describe('Lead Model Validation', () => {
    it('should successfully create a lead with valid data', async () => {
        const validLeadData = {
            profileId: new mongoose.Types.ObjectId(),
            recipientName: 'Alice Smith',
            recipientEmail: 'alice@example.com',
            recipientPhone: '+2348000000000',
        };
        const lead = new Lead(validLeadData);
        const savedLead = await lead.save();
        expect(savedLead._id).toBeDefined();
        expect(savedLead.recipientName).toBe(validLeadData.recipientName);
    });

    it('should fail if recipientName is missing', async () => {
        const invalidLead = new Lead({ recipientEmail: 'alice@example.com' });
        let error;
        try {
            await invalidLead.save();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect((error as any).errors.recipientName).toBeDefined();
    });
});
