import { Router } from 'express';
import { LeadController } from '../controllers/LeadController';
import { validate } from '../middleware/validate';
import { createLeadSchema } from '../utils/validators';

const router = Router();
const leadController = new LeadController();

router.post('/:profileId', validate(createLeadSchema), leadController.createLead);

export default router;
