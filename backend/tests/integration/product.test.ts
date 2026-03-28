import request from 'supertest';
import app from '../../src/app';

describe('Product Catalogue API', () => {
    describe('GET /api/v1/products/cards', () => {
        it('should return a list of available cards and their details', async () => {
            const response = await request(app).get('/api/v1/products/cards');
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data).toBeDefined();
            expect(Array.isArray(response.body.data)).toBe(true);
            
            // Check that it contains at least one smart card
            const smartCard = response.body.data.find((c: any) => c.cardType === 'SMART_ONLY');
            expect(smartCard).toBeDefined();
            expect(smartCard.finishes).toBeDefined();
            expect(smartCard.finishes).toContain('Matte Black Metal');
        });
    });
});
