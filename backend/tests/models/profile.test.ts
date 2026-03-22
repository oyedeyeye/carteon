import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Profile } from '../../src/models/Profile';

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

describe('Profile Model Validation', () => {
    it('should successfully create a profile with valid data', async () => {
        const validProfileData = {
            userId: new mongoose.Types.ObjectId(),
            cardId: new mongoose.Types.ObjectId(),
            profileName: 'Business Profile',
            identity: {
                fullName: 'Jane Doe',
                title: 'CTO',
            },
            contactInfo: {
                email: 'jane@example.com',
            },
            links: [
                { type: 'LinkedIn', url: 'https://linkedin.com/in/janedoe', label: 'LinkedIn' }
            ]
        };
        const profile = new Profile(validProfileData);
        const savedProfile = await profile.save();
        expect(savedProfile._id).toBeDefined();
        expect(savedProfile.identity.fullName).toBe('Jane Doe');
    });

    it('should fail if userId is missing', async () => {
        const invalidProfile = new Profile({ profileName: 'Test' });
        let error;
        try {
            await invalidProfile.save();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect((error as any).errors.userId).toBeDefined();
    });
});
