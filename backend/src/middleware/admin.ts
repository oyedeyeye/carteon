import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-admin-api-key'];

    if (!apiKey || typeof apiKey !== 'string') {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized: Admin API key missing or invalid',
        });
    }

    const validKey = process.env.ADMIN_API_KEY;

    // Fail-safe logic halts the app explicitly if environment states are insecurely mounted.
    if (!validKey) {
        console.error('CRITICAL: ADMIN_API_KEY is not set in environment variables.');
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error: Admin configuration missing',
        });
    }

    const providedKeyBuffer = Buffer.from(apiKey);
    const validKeyBuffer = Buffer.from(validKey);

    if (
        providedKeyBuffer.length !== validKeyBuffer.length ||
        !crypto.timingSafeEqual(providedKeyBuffer, validKeyBuffer)
    ) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized: Invalid Admin API key',
        });
    }

    next();
};
