import request from 'supertest';
import express, { Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../../src/middleware/validate';

describe('Validation Middleware Protection', () => {
    it('should explicitly strip extraneous properties to prevent Mass Assignment', async () => {
        const app = express();
        app.use(express.json());

        const testSchema = z.object({
            body: z.object({ name: z.string() })
        });

        app.post('/test', validate(testSchema), (req: Request, res: Response) => {
            res.json(req.body);
        });

        const res = await request(app)
            .post('/test')
            .send({ name: 'Valid User', role: "admin" });

        if (res.status !== 200) {
            console.log('Validation Response:', res.body);
        }

        expect(res.status).toBe(200);
        expect(res.body.role).toBeUndefined(); // Fails on vulnerable app, passes with secure stripping
        expect(res.body.name).toBe('Valid User');
    });
});
