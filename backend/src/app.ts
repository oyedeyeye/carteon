import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import profileRoutes from './routes/profileRoutes';
import leadRoutes from './routes/leadRoutes';
import { orderRouter, webhookRouter } from './routes/orderRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/profiles', profileRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/webhooks', webhookRouter);
app.use('/api/v1/admin', adminRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default app;
