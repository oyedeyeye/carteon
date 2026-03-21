import { z } from 'zod';

export const getProfileSchema = z.object({
    params: z.object({
        cardId: z.string().min(1, 'Card ID is required'),
    }),
    query: z.object({
        profileId: z.string().optional(),
    }),
});

export const createLeadSchema = z.object({
    params: z.object({
        profileId: z.string().min(1, 'Profile ID is required'),
    }),
    body: z.object({
        recipientName: z.string().min(1, 'Full Name is required'),
        recipientEmail: z.string().email('Valid email is required').min(1, 'Email is required'),
        recipientPhone: z.string().min(1, 'Phone is required'),
        recipientCompany: z.string().optional(),
    }),
});
