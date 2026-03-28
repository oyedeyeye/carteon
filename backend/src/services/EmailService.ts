import nodemailer from 'nodemailer';

interface LeadData {
    recipientName: string;
    recipientEmail: string;
    recipientPhone: string;
    recipientCompany?: string;
}

const escapeHtml = (unsafe: string): string => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

export class EmailService {
    private transporter;

    constructor() {
        // Configure standard SMTP based on environment variables or fallbacks
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER || 'ethereal_user',
                pass: process.env.SMTP_PASSWORD || 'ethereal_pass',
            },
        });
    }

    async sendLeadNotification(ownerEmail: string, leadData: LeadData): Promise<void> {
        const safeName = escapeHtml(leadData.recipientName);
        const safeEmail = escapeHtml(leadData.recipientEmail);
        const safePhone = escapeHtml(leadData.recipientPhone);
        const safeCompany = leadData.recipientCompany ? escapeHtml(leadData.recipientCompany) : '';

        const mailOptions = {
            from: process.env.FROM_EMAIL || '"Carteon Alerts" <alerts@carteon.com>',
            to: ownerEmail,
            subject: 'New Contact from Your Carteon Card',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>New Contact Alert!</h2>
                    <p>Someone just shared their contact details with you via your Carteon Card.</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
                        <p><strong>Name:</strong> ${safeName}</p>
                        <p><strong>Email:</strong> ${safeEmail}</p>
                        <p><strong>Phone:</strong> ${safePhone}</p>
                        ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
                    </div>
                </div>
            `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending lead notification email:', error);
            throw new Error('Failed to send email notification');
        }
    }
}
