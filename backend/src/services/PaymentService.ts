import crypto from 'crypto';


interface PaymentInitializationData {
    amount: number;
    email: string;
    reference: string;
    callback_url?: string;
}

export class PaymentService {
    async initializePayment(data: PaymentInitializationData): Promise<{ authorizationUrl: string; reference: string }> {
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            throw new Error('Paystack secret key is not configured');
        }

        try {
            const response = await fetch('https://api.paystack.co/transaction/initialize', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${secretKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: data.amount,
                    email: data.email,
                    reference: data.reference,
                    callback_url: data.callback_url
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error initializing payment with Paystack', errorData);
                throw new Error('Failed to initialize payment');
            }

            const responseData = await response.json();
            return {
                authorizationUrl: responseData.data.authorization_url,
                reference: responseData.data.reference,
            };
        } catch (error: any) {
            console.error('Error initializing payment', error.message);
            throw new Error('Failed to initialize payment');
        }
    }

    async verifyTransaction(reference: string): Promise<any> {
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            throw new Error('Paystack secret key is not configured');
        }

        try {
            const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${secretKey}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error(`Error verifying payment ${reference} with Paystack`, errorData);
                throw new Error('Failed to verify payment with Paystack');
            }

            const responseData = await response.json();
            return responseData.data;
        } catch (error: any) {
            console.error(`Error verifying payment ${reference}`, error.message);
            throw new Error('Failed to verify payment');
        }
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
