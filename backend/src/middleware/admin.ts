import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-admin-api-key'];

    if (!apiKey) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized: Admin API key missing',
        });
    }

    const validKey = process.env.ADMIN_API_KEY || 'default_admin_key_for_dev';

    if (apiKey !== validKey) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized: Invalid Admin API key',
        });
    }

    next();
};
