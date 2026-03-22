import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app';
import { User } from '../../src/models/User';
import { Card } from '../../src/models/Card';
import { Profile } from '../../src/models/Profile';

describe('Admin Internal API Endpoints', () => {
    let mongoServer: MongoMemoryServer;
    const adminKey = 'test_admin_key';

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        process.env.ADMIN_API_KEY = adminKey;
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await Card.deleteMany({});
        await Profile.deleteMany({});
    });

    describe('POST /api/v1/admin/users', () => {
        it('should manually create a user', async () => {
            const userData = {
                email: 'newuser@example.com',
                fullName: 'New User',
                phone: '+12345678',
                deliveryAddress: '123 Fake St'
            };

            const res = await request(app)
                .post('/api/v1/admin/users')
                .set('x-admin-api-key', adminKey)
                .send(userData);

            expect(res.status).toBe(201);
            expect(res.body.data.email).toBe('newuser@example.com');
            const user = await User.findOne({ email: 'newuser@example.com' });
            expect(user).not.toBeNull();
        });

        it('should require admin api key', async () => {
            const res = await request(app)
                .post('/api/v1/admin/users')
                .send({});

            expect(res.status).toBe(401);
        });
    });

    describe('POST /api/v1/admin/cards', () => {
        it('should manually create and activate a card for a user', async () => {
            const user = await User.create({ email: 'owner@example.com', fullName: 'Card Owner', phone: '123456789' });

            const cardData = {
                cardId: 'NFC-999',
                userId: user._id.toString(),
                cardType: 'COMPLETE_PACKAGE',
                status: 'ACTIVE',
                slug: 'ceo-john',
                subscription: { planType: 'FREE' }
            };

            const res = await request(app)
                .post('/api/v1/admin/cards')
                .set('x-admin-api-key', adminKey)
                .send(cardData);

            expect(res.status).toBe(201);
            expect(res.body.data.cardId).toBe('NFC-999');
            const card = await Card.findOne({ cardId: 'NFC-999' });
            expect(card).not.toBeNull();
            expect(card?.userId.toString()).toBe(user._id.toString());
        });
    });

    describe('POST /api/v1/admin/profiles', () => {
        it('should manually generate a profile for a card', async () => {
            const user = await User.create({ email: 'owner@example.com', fullName: 'Card Owner', phone: '123' });
            const card = await Card.create({
                cardId: 'NFC-777',
                userId: user._id,
                cardType: 'SMART_ONLY',
                status: 'ACTIVE',
                slug: 'john-doe-ceo'
            });

            const profileData = {
                userId: user._id.toString(),
                cardId: card._id.toString(),
                profileName: 'Executive Profile',
                isDefault: true,
                identity: {
                    fullName: 'John CEO',
                    title: 'Chief Executive'
                },
                contactInfo: {
                    email: 'ceo@example.com',
                },
                isActive: true
            };

            const res = await request(app)
                .post('/api/v1/admin/profiles')
                .set('x-admin-api-key', adminKey)
                .send(profileData);

            expect(res.status).toBe(201);
            expect(res.body.data.profileName).toBe('Executive Profile');

            const profile = await Profile.findOne({ cardId: card._id });
            expect(profile).not.toBeNull();
            expect(profile?.identity.fullName).toBe('John CEO');
        });
    });
});
