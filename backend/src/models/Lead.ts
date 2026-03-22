import mongoose, { Schema, model, Document } from 'mongoose';

export interface ILead extends Document {
    profileId: mongoose.Types.ObjectId;
    recipientName: string;
    recipientEmail: string;
    recipientPhone: string;
    recipientCompany?: string;
    createdAt: Date;
}

const leadSchema = new Schema<ILead>(
    {
        profileId: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: [true, 'Profile ID is required'],
        },
        recipientName: {
            type: String,
            required: [true, 'Recipient name is required'],
            trim: true,
        },
        recipientEmail: {
            type: String,
            required: [true, 'Recipient email is required'],
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        },
        recipientPhone: {
            type: String,
            required: [true, 'Recipient phone is required'],
            trim: true,
        },
        recipientCompany: {
            type: String,
            trim: true,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } },
);

export const Lead = model<ILead>('Lead', leadSchema);
