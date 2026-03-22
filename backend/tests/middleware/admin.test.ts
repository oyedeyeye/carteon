import request from 'supertest';
import app from '../../src/app';

describe('Admin Middleware Security', () => {
    let originalEnvKey: string | undefined;

    beforeAll(() => {
        originalEnvKey = process.env.ADMIN_API_KEY;
    });

    afterAll(() => {
        if (originalEnvKey) {
            process.env.ADMIN_API_KEY = originalEnvKey;
        } else {
            delete process.env.ADMIN_API_KEY;
        }
    });

    it('should fail with 500 if ADMIN_API_KEY is missing (prevent default fallback)', async () => {
        delete process.env.ADMIN_API_KEY;

        const res = await request(app)
            .post('/api/v1/admin/users')
            .set('x-admin-api-key', 'default_admin_key_for_dev')
            .send({});

        // Validates that it doesn't default to a weak key but instead errors out securely
        expect(res.status).toBe(500);
    });

    it('should fail with 401 when keys mismatch using raw buffer time-safe checks', async () => {
        process.env.ADMIN_API_KEY = 'secure_prod_key';

        // Passing a key that is shorter to prove we don't crash from buffer comparison length mismatches
        const res = await request(app)
            .post('/api/v1/admin/users')
            .set('x-admin-api-key', 'short')
            .send({});

        expect(res.status).toBe(401);
    });
});
