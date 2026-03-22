import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        if (process.env.NODE_ENV !== 'test' && process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('Connected to MongoDB');
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
