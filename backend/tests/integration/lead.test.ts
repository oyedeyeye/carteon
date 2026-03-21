import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../src/app';
import { Profile } from '../../src/models/Profile';
import { User } from '../../src/models/User';
import { Card } from '../../src/models/Card';
import { Lead } from '../../src/models/Lead';
import { EmailService } from '../../src/services/EmailService';

jest.mock('../../src/services/EmailService');

describe('POST /api/v1/leads/:profileId', () => {
    let mongoServer: MongoMemoryServer;
    let user: any;
    let card: any;
    let profile: any;

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
        await Card.deleteMany({});
        await Profile.deleteMany({});
        await Lead.deleteMany({});
        jest.clearAllMocks();

        user = await User.create({
            email: 'owner@example.com',
            fullName: 'Card Owner',
            phone: '123456789',
        });

        card = await Card.create({
            cardId: 'NFC-123',
            userId: user._id,
            cardType: 'SMART_ONLY',
            status: 'ACTIVE',
            slug: 'owner-slug',
        });

        profile = await Profile.create({
            userId: user._id,
            cardId: card._id,
            profileName: 'Main Profile',
            identity: { fullName: 'Card Owner', title: 'CEO' },
            contactInfo: { email: 'owner@example.com' },
            isActive: true,
        });
    });

    it('should successfully create a lead and trigger an email when valid payload is sent', async () => {
        const leadData = {
            recipientName: 'Interested Client',
            recipientEmail: 'client@example.com',
            recipientPhone: '+987654321',
            recipientCompany: 'Acme Corp',
        };

        const res = await request(app)
            .post(`/api/v1/leads/${profile._id}`)
            .send(leadData);

        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.data.recipientName).toBe('Interested Client');

        const dbLead = await Lead.findOne({ recipientEmail: 'client@example.com' });
        expect(dbLead).not.toBeNull();
        expect(dbLead?.profileId.toString()).toBe(profile._id.toString());

        expect(EmailService.prototype.sendLeadNotification).toHaveBeenCalledTimes(1);
        expect(EmailService.prototype.sendLeadNotification).toHaveBeenCalledWith('owner@example.com', expect.objectContaining({
            recipientName: 'Interested Client',
            recipientEmail: 'client@example.com',
            recipientPhone: '+987654321',
            recipientCompany: 'Acme Corp',
        }));
    });

    it('should return 400 if validation fails', async () => {
        const invalidData = {
            recipientEmail: 'not-an-email',
            // Missing required name and phone
        };

        const res = await request(app)
            .post(`/api/v1/leads/${profile._id}`)
            .send(invalidData);

        expect(res.status).toBe(400);
        expect(res.body.status).toBe('error');
    });

    it('should return 404 if profile does not exist', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const leadData = {
            recipientName: 'Client',
            recipientEmail: 'client@example.com',
            recipientPhone: '12345',
        };

        const res = await request(app)
            .post(`/api/v1/leads/${fakeId}`)
            .send(leadData);

        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/Profile not found/i);
    });
});
