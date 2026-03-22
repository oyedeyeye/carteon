import { Request, Response } from 'express';
import { User } from '../models/User';
import { Card } from '../models/Card';
import { Profile } from '../models/Profile';
import mongoose from 'mongoose';

export class AdminController {
    async createUser(req: Request, res: Response) {
        try {
            const userData = req.body;
            const user = await User.create(userData);
            return res.status(201).json({ status: 'success', data: user });
        } catch (error: any) {
            console.error('Core Logic Execution Fault (createUser):', error.message);
            return res.status(500).json({ status: 'error', message: 'Internal server error while creating user' });
        }
    }

    async createCard(req: Request, res: Response) {
        try {
            const cardData = req.body;

            if (!mongoose.Types.ObjectId.isValid(cardData.userId)) {
                return res.status(400).json({ status: 'error', message: 'Invalid userId' });
            }

            const card = await Card.create(cardData);
            return res.status(201).json({ status: 'success', data: card });
        } catch (error: any) {
            console.error('Core Logic Execution Fault (createCard):', error.message);
            return res.status(500).json({ status: 'error', message: 'Internal server error while creating card' });
        }
    }

    async createProfile(req: Request, res: Response) {
        try {
            const profileData = req.body;

            if (!mongoose.Types.ObjectId.isValid(profileData.userId) || !mongoose.Types.ObjectId.isValid(profileData.cardId)) {
                return res.status(400).json({ status: 'error', message: 'Invalid object IDs' });
            }

            const profile = await Profile.create(profileData);
            return res.status(201).json({ status: 'success', data: profile });
        } catch (error: any) {
            console.error('Core Logic Execution Fault (createProfile):', error.message);
            return res.status(500).json({ status: 'error', message: 'Internal server error while creating profile' });
        }
    }
}
