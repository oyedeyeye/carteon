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

describe('PaymentService.initializePayment', () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterAll(() => {
        global.fetch = originalFetch;
    });

    it('should call Paystack API and return authorizationUrl', async () => {
        process.env.PAYSTACK_SECRET_KEY = 'mock_secret_key';
        
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    authorization_url: 'https://checkout.paystack.com/real_url',
                    reference: 'mock_ref_123',
                }
            })
        });

        const paymentService = new PaymentService();
        const result = await paymentService.initializePayment({
            amount: 5000,
            email: 'test@example.com',
            reference: 'mock_ref_123',
            callback_url: 'http://localhost/callback'
        });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.paystack.co/transaction/initialize',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer mock_secret_key',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: 5000,
                    email: 'test@example.com',
                    reference: 'mock_ref_123',
                    callback_url: 'http://localhost/callback'
                })
            }
        );
        expect(result.authorizationUrl).toBe('https://checkout.paystack.com/real_url');
        expect(result.reference).toBe('mock_ref_123');
    });

    it('should throw error if PAYSTACK_SECRET_KEY is missing', async () => {
        delete process.env.PAYSTACK_SECRET_KEY;
        const paymentService = new PaymentService();

        await expect(paymentService.initializePayment({
            amount: 5000,
            email: 'test@example.com',
            reference: 'mock_ref_123'
        })).rejects.toThrow('Paystack secret key is not configured');
    });

    it('should throw generic error on Paystack failure', async () => {
        process.env.PAYSTACK_SECRET_KEY = 'mock_secret_key';
        
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Network Error' })
        });

        const paymentService = new PaymentService();
        
        await expect(paymentService.initializePayment({
            amount: 5000,
            email: 'fail@example.com',
            reference: 'mock_ref_123'
        })).rejects.toThrow('Failed to initialize payment');
    });
});
