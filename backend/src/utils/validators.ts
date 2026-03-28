import { z } from 'zod';

export const getProfileSchema = z.object({
    params: z.object({
        cardId: z.string().min(1, 'Card ID is required'),
    }),
    query: z.object({
        profileId: z.string().optional(),
    }).optional(),
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

export const createOrderSchema = z.object({
    body: z.object({
        customerData: z.object({
            name: z.string().min(1, 'Name is required'),
            email: z.string().email('Valid email is required'),
            phone: z.string().min(1, 'Phone is required'),
            address: z.string().min(1, 'Address is required'),
        }),
        items: z.array(z.object({
            cardType: z.enum(['SMART_ONLY', 'PVC_QR_ONLY', 'COMPLETE_PACKAGE']),
            quantity: z.number().min(1, 'At least 1 item is required'),
            colorVariant: z.string().optional(),
        })).min(1, 'Order must contain at least one item'),
        totalAmount: z.number().min(0, 'Total amount must be greater or equal to zero'),
    })
});

export const adminCreateUserSchema = z.object({
    body: z.object({
        email: z.string().email('Valid email is required'),
        fullName: z.string().min(1, 'Full name is required'),
        phone: z.string().optional(),
        deliveryAddress: z.string().optional(),
    }),
});

export const adminCreateCardSchema = z.object({
    body: z.object({
        cardId: z.string().min(1, 'Card ID is required'),
        userId: z.string().min(1, 'User ID is required'),
        cardType: z.enum(['SMART_ONLY', 'PVC_QR_ONLY', 'COMPLETE_PACKAGE']),
        colorVariant: z.string().optional(),
        status: z.enum(['PENDING_ACTIVATION', 'ACTIVE', 'INACTIVE']).optional(),
        slug: z.string().min(1, 'Slug is required'),
        subscription: z.object({
            status: z.string().optional(),
            expiryDate: z.string().pipe(z.coerce.date()).optional(),
            planType: z.enum(['FREE', 'MULTI_PROFILE', 'CUSTOM_THEME', 'BUNDLE']).optional(),
        }).optional()
    }),
});

export const adminCreateProfileSchema = z.object({
    body: z.object({
        userId: z.string().min(1, 'User ID is required'),
        cardId: z.string().min(1, 'Card ID is required'),
        profileName: z.string().min(1, 'Profile Name is required'),
        isDefault: z.boolean().optional(),
        theme: z.object({
            backgroundColor: z.string().optional(),
            isCustomBrandTemplate: z.boolean().optional(),
        }).strict().optional(),
        identity: z.object({
            fullName: z.string().min(1, 'Identity full name is required'),
            title: z.string().optional(),
            company: z.string().optional(),
            bio: z.string().optional(),
            photoUrl: z.string().optional(),
            logoUrl: z.string().optional(),
        }).strict(),
        contactInfo: z.object({
            phone: z.string().optional(),
            email: z.string().email().optional(),
            whatsapp: z.string().optional(),
        }).strict().optional(),
        links: z.array(z.object({
            type: z.string().min(1),
            url: z.string().min(1),
            label: z.string().min(1),
            order: z.number().optional()
        }).strict()).optional(),
        isActive: z.boolean().optional(),
    }).strict()
});
