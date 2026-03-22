import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Card } from '../models/Card';
import { Profile } from '../models/Profile';
import { Lead } from '../models/Lead';
import { Order } from '../models/Order';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/carteon_dev';

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to Database for seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Card.deleteMany({});
        await Profile.deleteMany({});
        await Lead.deleteMany({});
        await Order.deleteMany({});
        console.log('🗑️ Cleared existing data.');

        // 1. Create a User
        const user1 = await User.create({
            email: 'jane.ceo@example.com',
            fullName: 'Jane Doe',
            phone: '+2348011223344',
            deliveryAddress: '1A Executive Drive, Victoria Island, Lagos'
        });

        const user2 = await User.create({
            email: 'mark.sales@example.com',
            fullName: 'Mark Smith',
            phone: '+2348055667788',
            deliveryAddress: '10 Business Ave, Ikeja, Lagos'
        });

        // 2. Create Cards
        const card1 = await Card.create({
            cardId: 'NFC-JANE-001',
            userId: user1._id,
            cardType: 'COMPLETE_PACKAGE',
            status: 'ACTIVE',
            slug: 'jane-doe',
            subscription: {
                status: 'active',
                planType: 'MULTI_PROFILE',
                expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) // 1 year from now
            }
        });

        const card2 = await Card.create({
            cardId: 'NFC-MARK-002',
            userId: user2._id,
            cardType: 'SMART_ONLY',
            status: 'PENDING_ACTIVATION',
            slug: 'mark-smith',
            subscription: {
                status: 'inactive',
                planType: 'FREE'
            }
        });

        // 3. Create Profiles
        const profile1 = await Profile.create({
            cardId: card1._id,
            userId: user1._id,
            profileName: 'Executive Profile',
            isDefault: true,
            theme: { backgroundColor: '#1A202C', isCustomBrandTemplate: true },
            identity: {
                fullName: 'Jane Doe',
                title: 'Chief Executive Officer',
                company: 'Tech Innovators Ltd',
                bio: 'Leading the future of digital solutions.'
            },
            contactInfo: {
                phone: '+2348011223344',
                email: 'jane.ceo@example.com',
                whatsapp: '+2348011223344'
            },
            links: [
                { type: 'LinkedIn', url: 'https://linkedin.com/in/janedoe', label: 'Let\'s Connect', order: 1 },
                { type: 'Website', url: 'https://techinnovators.com', label: 'Company Website', order: 2 }
            ],
            isActive: true
        });

        const profile2 = await Profile.create({
            cardId: card1._id, // Jane's multi-profile card
            userId: user1._id,
            profileName: 'Creative Portfolio',
            isDefault: false,
            theme: { backgroundColor: '#F6E05E', isCustomBrandTemplate: false },
            identity: {
                fullName: 'Jane Doe',
                title: 'Creative Director',
                bio: 'Exploring art in technology.'
            },
            contactInfo: {
                email: 'creative.jane@example.com',
            },
            links: [
                { type: 'Portfolio', url: 'https://behance.net/janedoe', label: 'My Work', order: 1 }
            ],
            isActive: true
        });

        // 4. Create Leads (Someone shared their contact with Jane)
        await Lead.create({
            profileId: profile1._id,
            recipientName: 'Interested Investor',
            recipientEmail: 'investor@capital.com',
            recipientPhone: '+1-555-0198',
            recipientCompany: 'Capital Ventures'
        });

        await Lead.create({
            profileId: profile1._id,
            recipientName: 'Event Organizer',
            recipientEmail: 'hello@events.io',
            recipientPhone: '+44 20 7123 4567'
        });

        // 5. Create an Order
        await Order.create({
            customerData: {
                name: 'Alice Johnson',
                email: 'alice.j@corp.com',
                phone: '+2348099887766',
                address: '5 Enterprise Rd, Abuja'
            },
            items: [
                { cardType: 'PVC_QR_ONLY', quantity: 5 }
            ],
            totalAmount: 25000,
            paymentStatus: 'SUCCESS',
            paymentGateway: 'paystack',
            transactionReference: 'CRT_abc123def456'
        });

        console.log('🌱 Seed data injected successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
