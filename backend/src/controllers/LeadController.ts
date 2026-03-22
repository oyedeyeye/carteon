import { Request, Response } from 'express';
import { LeadService } from '../services/LeadService';

const leadService = new LeadService();

export class LeadController {
    async createLead(req: Request, res: Response) {
        try {
            const profileId = req.params.profileId as string;
            const leadData = req.body;

            const result = await leadService.createLead(profileId, leadData);

            if (result.error) {
                return res.status(result.status).json({
                    status: 'error',
                    message: result.error,
                });
            }

            return res.status(result.status || 201).json({
                status: 'success',
                message: 'Contact shared successfully!',
                data: result.data,
            });
        } catch (error) {
            console.error('Error creating lead:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    }
}
