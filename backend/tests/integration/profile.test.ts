import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app';
import { Card } from '../../src/models/Card';
import { User } from '../../src/models/User';
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

describe('GET /api/v1/profiles/:cardId', () => {
    let user: any;
    let card: any;
    let profile: any;

    beforeEach(async () => {
        await User.deleteMany({});
        await Card.deleteMany({});
        await Profile.deleteMany({});

        user = await User.create({
            email: 'test@example.com',
            fullName: 'Test User',
        });

        card = await Card.create({
            cardId: 'TEST-CARD-001',
            userId: user._id,
            cardType: 'SMART_ONLY',
            status: 'ACTIVE',
            slug: 'test-slug',
        });

        profile = await Profile.create({
            userId: user._id,
            cardId: card._id,
            profileName: 'Default Profile',
            identity: { fullName: 'Test User' },
            contactInfo: { email: 'test@example.com' },
            isActive: true,
            isDefault: true,
        });
    });

    it('should return 200 and profile data for a valid cardId', async () => {
        const res = await request(app).get(`/api/v1/profiles/${card.cardId}`);
        expect(res.status).toBe(200);
        expect(res.body.data.profileName).toBe('Default Profile');
        expect(res.body.data.identity.fullName).toBe('Test User');
    });

    it('should return 404 if card does not exist', async () => {
        const res = await request(app).get('/api/v1/profiles/NON-EXISTENT');
        expect(res.status).toBe(404);
    });

    it('should return 404 if card exists but has no active profiles', async () => {
        await Profile.updateOne({ _id: profile._id }, { isActive: false });
        const res = await request(app).get(`/api/v1/profiles/${card.cardId}`);
        expect(res.status).toBe(404);
    });
});
