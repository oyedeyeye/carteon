import { Profile, IProfile } from '../models/Profile';
import { Card } from '../models/Card';
import mongoose from 'mongoose';

export class ProfileService {
    async getActiveProfileByCardId(cardId: string, profileId?: string): Promise<IProfile | null> {
        const card = await Card.findOne({ cardId });
        if (!card) return null;

        if (profileId && mongoose.Types.ObjectId.isValid(profileId)) {
            return await Profile.findOne({ _id: profileId, cardId: card._id, isActive: true });
        }

        // Default: prioritize isDefault, then just any active profile for this card
        return (
            (await Profile.findOne({ cardId: card._id, isDefault: true, isActive: true })) ||
            (await Profile.findOne({ cardId: card._id, isActive: true }))
        );
    }
}
