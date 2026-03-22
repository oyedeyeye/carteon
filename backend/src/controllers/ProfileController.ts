import { Request, Response } from 'express';
import { ProfileService } from '../services/ProfileService';

const profileService = new ProfileService();

export class ProfileController {
    async getProfile(req: Request, res: Response) {
        try {
            const { cardId } = req.params;
            const profileId = req.query['profileId'] as string | undefined;
            const profile = await profileService.getActiveProfileByCardId(cardId as string, profileId);

            if (!profile) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Active profile not found for this card',
                });
            }

            return res.status(200).json({
                status: 'success',
                data: profile,
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    }
}
