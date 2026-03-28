import request from 'supertest';
import app from '../src/app';

describe('Health Check Endpoint', () => {
    it('should return 200 OK and a status message', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
    });
});

describe('Global Error Handling / App Hardening', () => {
    it('should return a secure JSON response on malformed JSON instead of an HTML stack trace', async () => {
        const res = await request(app)
            .post('/api/v1/orders')
            .set('Content-Type', 'application/json')
            .send('{"badJSON": "missing_quote }');

        expect(res.status).toBe(400);
        expect(res.headers['content-type']).toMatch(/json/);
        // Before Fix: Returns 400 with text/html containing stack trace
        // After Fix: Returns strict JSON error message without system internals
        expect(res.body.message).toBe('Malformed JSON payload');
        expect(res.text).not.toContain('<html');
    });
});
