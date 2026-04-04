import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import profileRoutes from './routes/profileRoutes';
import leadRoutes from './routes/leadRoutes';
import { orderRouter, webhookRouter } from './routes/orderRoutes';
import adminRoutes from './routes/adminRoutes';
import { productRouter } from './routes/productRoutes';

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(cors());
app.use(express.json({
    verify: (req: any, res, buf) => {
        if (req.originalUrl && req.originalUrl.startsWith('/api/v1/webhooks')) {
            req.rawBody = buf;
        }
    }
}));

app.use('/api/v1/profiles', profileRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/webhooks', webhookRouter);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/products', productRouter);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Gracefully catch malformed JSON payloads bypassing default HTML parsers
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            status: 'error',
            message: 'Malformed JSON payload'
        });
    }

    console.error('Unhandled System Error:', err.message);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};

app.use(globalErrorHandler);

export default app;
