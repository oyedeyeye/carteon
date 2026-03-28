import { EmailService } from '../../src/services/EmailService';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('EmailService', () => {
    let emailService: EmailService;
    let mockSendMail: jest.Mock;

    beforeEach(() => {
        mockSendMail = jest.fn().mockResolvedValue(true);
        (nodemailer.createTransport as jest.Mock).mockReturnValue({
            sendMail: mockSendMail,
        });

        emailService = new EmailService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send an email with the correct subject "New Contact from Your Carteon Card" and owner email', async () => {
        const leadData = {
            recipientName: 'Alice',
            recipientEmail: 'alice@example.com',
            recipientPhone: '+123456789',
            recipientCompany: 'Wonderland Inc.',
        };
        const ownerEmail = 'owner@carteon.app';

        await emailService.sendLeadNotification(ownerEmail, leadData);

        expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
        expect(mockSendMail).toHaveBeenCalledTimes(1);

        const callArgs = mockSendMail.mock.calls[0][0];
        expect(callArgs.to).toBe(ownerEmail);
        expect(callArgs.subject).toBe('New Contact from Your Carteon Card');
        expect(callArgs.html).toContain('Alice');
        expect(callArgs.html).toContain('alice@example.com');
        expect(callArgs.html).toContain('+123456789');
        expect(callArgs.html).toContain('Wonderland Inc.');
    });

    it('should strictly encode HTML tokens to their entities before email compilation to prevent HTML injection', async () => {
        const maliciousPayload = {
            recipientName: '<script>alert("XSS")</script>Client',
            recipientEmail: 'client@carteon.com',
            recipientPhone: '123',
            recipientCompany: '<img src=x onerror=alert(1)>'
        };

        await emailService.sendLeadNotification('admin@carteon.com', maliciousPayload);
        const generatedHtml = mockSendMail.mock.calls[0][0].html;
        
        // Assert malicious entities are completely sanitized
        expect(generatedHtml).not.toContain('<script>');
        expect(generatedHtml).toContain('&lt;script&gt;');
        expect(generatedHtml).not.toContain('<img');
        expect(generatedHtml).toContain('&lt;img');
    });
});
