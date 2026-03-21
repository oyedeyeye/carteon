import { Lead } from '../models/Lead';
import { Profile } from '../models/Profile';
import { User } from '../models/User';
import { EmailService } from './EmailService';
import mongoose from 'mongoose';

export class LeadService {
    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }

    async createLead(profileId: string, leadData: any) {
        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return { error: 'Invalid profile ID format', status: 400 };
        }

        const profile: any = await Profile.findById(profileId);
        if (!profile) {
            return { error: 'Profile not found', status: 404 };
        }

        const owner: any = await User.findById(profile.userId);
        if (!owner) {
            return { error: 'Owner not found', status: 404 };
        }

        const newLead = new Lead({
            profileId: profile._id,
            ...leadData
        });

        await newLead.save();

        if (owner.email) {
            try {
                await this.emailService.sendLeadNotification(owner.email, leadData);
            } catch (err) {
                console.error("Failed to send lead email, but lead was saved:", err);
            }
        }

        return { data: newLead, status: 201 };
    }
}
