import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Card } from '../../src/models/Card';

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

describe('Card Model Validation', () => {
    it('should successfully create a card with valid data', async () => {
        const validCardData = {
            cardId: 'NFC-123456',
            userId: new mongoose.Types.ObjectId(),
            cardType: 'SMART_ONLY',
            status: 'ACTIVE',
            slug: 'my-premium-card',
            subscription: {
                status: 'active',
                planType: 'MULTI_PROFILE',
                expiryDate: new Date(Date.now() + 100000),
            },
        };
        const card = new Card(validCardData);
        const savedCard = await card.save();
        expect(savedCard._id).toBeDefined();
        expect(savedCard.cardId).toBe(validCardData.cardId);
        expect(savedCard.slug).toBe(validCardData.slug);
    });

    it('should successfully create a card with a colorVariant', async () => {
        const validCardData = {
            cardId: 'NFC-COLOR-1',
            userId: new mongoose.Types.ObjectId(),
            cardType: 'SMART_ONLY',
            status: 'ACTIVE',
            slug: 'my-color-card',
            colorVariant: 'Matte Black Metal'
        };
        const card = new Card(validCardData);
        const savedCard = await card.save();
        expect(savedCard.colorVariant).toBe('Matte Black Metal');
    });

    it('should fail if cardId is missing', async () => {
        const invalidCard = new Card({ cardType: 'SMART_ONLY' });
        let error;
        try {
            await invalidCard.save();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect((error as any).errors.cardId).toBeDefined();
    });

    it('should fail if cardType is invalid', async () => {
        const invalidCard = new Card({ cardId: '123', cardType: 'INVALID_TYPE' });
        let error;
        try {
            await invalidCard.save();
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect((error as any).errors.cardType).toBeDefined();
    });
});
