import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
    customerData: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    items: Array<{
        cardType: 'SMART_ONLY' | 'PVC_QR_ONLY' | 'COMPLETE_PACKAGE';
        quantity: number;
        colorVariant?: string;
    }>;
    totalAmount: number;
    paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED';
    paymentGateway: string;
    transactionReference: string;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
    {
        customerData: {
            name: { type: String, required: true },
            email: {
                type: String,
                required: true,
                match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
            },
            phone: { type: String, required: true },
            address: { type: String, required: true },
        },
        items: [
            {
                cardType: {
                    type: String,
                    enum: ['SMART_ONLY', 'PVC_QR_ONLY', 'COMPLETE_PACKAGE'],
                    required: true,
                },
                quantity: { type: Number, required: true, min: 1 },
                colorVariant: { type: String },
            },
        ],
        totalAmount: { type: Number, required: true },
        paymentStatus: {
            type: String,
            enum: ['PENDING', 'SUCCESS', 'FAILED'],
            default: 'PENDING',
        },
        paymentGateway: { type: String, required: true },
        transactionReference: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

export const Order = model<IOrder>('Order', orderSchema);
