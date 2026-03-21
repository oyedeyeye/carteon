import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import profileRoutes from './routes/profileRoutes';
import leadRoutes from './routes/leadRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/profiles', profileRoutes);
app.use('/api/v1/leads', leadRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default app;
