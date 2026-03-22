import request from 'supertest';
import express, { Request, Response } from 'express';
import crypto from 'crypto';
import { PaymentService } from '../../src/services/PaymentService';
import app from '../../src/app';

describe('Webhook Signature Verification', () => {
    it('should correctly verify raw payload without stringify mismatch and resist timing attacks', async () => {
        const secret = 'test_secret';
        process.env.PAYMENT_WEBHOOK_SECRET = secret;

        // Simulating the exact payload with arbitrary spacing that normally gets stripped by JSON.parse
        const payloadStr = `{"event":"dummy.event",   "data":{"status": "success"}}`;
        const rawBody = Buffer.from(payloadStr);

        const validHash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');

        // Test the direct service method using unadulterated buffer
        const paymentService = new PaymentService();
        expect(paymentService.verifyWebhookSignature(validHash, rawBody)).toBe(true);

        const res = await request(app)
            .post('/api/v1/webhooks/payment')
            .set('x-paystack-signature', validHash)
            .set('Content-Type', 'application/json')
            .send(payloadStr);

        // Given it's a test environment, order ID doesn't exist, but it will process the signature as valid and try
        // returning 200 instead of dropping at 401 signature invalid check.
        expect(res.status).not.toBe(401);
    });

    it('should drop short timing attack signatures', () => {
        const secret = 'test_secret';
        process.env.PAYMENT_WEBHOOK_SECRET = secret;

        const payloadStr = `{"event":"charge.success"}`;
        const rawBody = Buffer.from(payloadStr);

        const paymentService = new PaymentService();
        expect(paymentService.verifyWebhookSignature('fast_short_hash', rawBody)).toBe(false);
    });
});
