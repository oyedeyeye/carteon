import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const validData = schema.parse({
            body: req.body !== undefined && req.body !== null ? req.body : {},
            query: req.query || {},
            params: req.params || {},
        }) as any;

        // Reassign the stripped, explicitly validated data back to the request
        if (validData.body !== undefined) req.body = validData.body;

        if (validData.query !== undefined) {
            for (const key of Object.keys(req.query)) delete req.query[key];
            Object.assign(req.query, validData.query);
        }

        if (validData.params !== undefined) {
            for (const key of Object.keys(req.params)) delete req.params[key];
            Object.assign(req.params, validData.params);
        }

        next();
    } catch (e: any) {
        console.error('ZOD ERROR:', JSON.stringify(e, null, 2), e.message);
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: e.errors,
        });
    }
};
