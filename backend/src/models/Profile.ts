import mongoose, { Schema, model, Document } from 'mongoose';

export interface IProfile extends Document {
    userId: mongoose.Types.ObjectId;
    cardId: mongoose.Types.ObjectId;
    isDefault: boolean;
    profileName: string;
    theme: {
        backgroundColor?: string;
        isCustomBrandTemplate: boolean;
    };
    identity: {
        photoUrl?: string;
        logoUrl?: string;
        fullName: string;
        title?: string;
        company?: string;
        bio?: string;
    };
    contactInfo: {
        phone?: string;
        email: string;
        whatsapp?: string;
    };
    links: Array<{
        type: string;
        url: string;
        label: string;
        order: number;
    }>;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const profileSchema = new Schema<IProfile>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
        },
        cardId: {
            type: Schema.Types.ObjectId,
            ref: 'Card',
            required: [true, 'Card ID is required'],
        },
        isDefault: { type: Boolean, default: false },
        profileName: { type: String, required: [true, 'Profile name is required'], trim: true },
        theme: {
            backgroundColor: { type: String, default: '#ffffff' },
            isCustomBrandTemplate: { type: Boolean, default: false },
        },
        identity: {
            photoUrl: { type: String },
            logoUrl: { type: String },
            fullName: { type: String, required: [true, 'Full name is required'], trim: true },
            title: { type: String },
            company: { type: String },
            bio: { type: String },
        },
        contactInfo: {
            phone: { type: String },
            email: {
                type: String,
                required: [true, 'Email is required'],
                match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
            },
            whatsapp: { type: String },
        },
        links: [
            {
                type: { type: String, required: true },
                url: { type: String, required: true },
                label: { type: String, required: true },
                order: { type: Number, default: 0 },
            },
        ],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
);

export const Profile = model<IProfile>('Profile', profileSchema);
