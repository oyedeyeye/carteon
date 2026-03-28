import mongoose, { Schema, model, Document } from 'mongoose';

export interface ICard extends Document {
    cardId: string;
    userId: mongoose.Types.ObjectId;
    cardType: 'SMART_ONLY' | 'PVC_QR_ONLY' | 'COMPLETE_PACKAGE';
    colorVariant?: string;
    status: 'PENDING_ACTIVATION' | 'ACTIVE' | 'INACTIVE';
    slug: string;
    subscription?: {
        status: string;
        expiryDate?: Date;
        planType: 'FREE' | 'MULTI_PROFILE' | 'CUSTOM_THEME' | 'BUNDLE';
    };
    createdAt: Date;
    updatedAt: Date;
}

const cardSchema = new Schema<ICard>(
    {
        cardId: {
            type: String,
            required: [true, 'Card ID is required'],
            unique: true,
            index: true,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
        },
        cardType: {
            type: String,
            enum: {
                values: ['SMART_ONLY', 'PVC_QR_ONLY', 'COMPLETE_PACKAGE'],
                message: '{VALUE} is not a valid card type',
            },
            required: [true, 'Card type is required'],
        },
        colorVariant: {
            type: String,
        },
        status: {
            type: String,
            enum: ['PENDING_ACTIVATION', 'ACTIVE', 'INACTIVE'],
            default: 'PENDING_ACTIVATION',
        },
        slug: {
            type: String,
            unique: true,
            index: true,
            required: [true, 'Slug is required'],
            lowercase: true,
            trim: true,
        },
        subscription: {
            status: { type: String, default: 'inactive' },
            expiryDate: { type: Date },
            planType: {
                type: String,
                enum: ['FREE', 'MULTI_PROFILE', 'CUSTOM_THEME', 'BUNDLE'],
                default: 'FREE'
            },
        },
    },
    { timestamps: true },
);

export const Card = model<ICard>('Card', cardSchema);
