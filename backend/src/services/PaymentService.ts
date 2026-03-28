import crypto from 'crypto';

interface PaymentInitializationData {
    amount: number;
    email: string;
    reference: string;
    callback_url?: string;
}

export class PaymentService {
    async initializePayment(data: PaymentInitializationData): Promise<{ authorizationUrl: string; reference: string }> {
        // Implementation for Paystack integration placeholder
        // In reality, you'd use axios to POST to https://api.paystack.co/transaction/initialize
        console.log('Initializing payment for:', data);

        return {
            authorizationUrl: 'https://checkout.paystack.com/test_url',
            reference: data.reference,
        };
    }

    verifyWebhookSignature(signature: string, rawBody: Buffer | string): boolean {
        const secret = process.env.PAYMENT_WEBHOOK_SECRET || '';
        if (!secret || !signature || !rawBody) return false;

        const expectedHash = crypto
            .createHmac('sha512', secret)
            .update(rawBody)
            .digest('hex');

        const providedSignatureBuffer = Buffer.from(signature);
        const expectedSignatureBuffer = Buffer.from(expectedHash);

        if (providedSignatureBuffer.length !== expectedSignatureBuffer.length) {
            return false;
        }

        return crypto.timingSafeEqual(providedSignatureBuffer, expectedSignatureBuffer);
    }
}
