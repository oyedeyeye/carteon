import request from 'supertest';
import app from '../src/app';

describe('Health Check Endpoint', () => {
    it('should return 200 OK and a status message', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
    });
});
