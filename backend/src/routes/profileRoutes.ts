import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController';
import { validate } from '../middleware/validate';
import { getProfileSchema } from '../utils/validators';

const router = Router();
const profileController = new ProfileController();

router.get('/:cardId', validate(getProfileSchema), profileController.getProfile);

export default router;
