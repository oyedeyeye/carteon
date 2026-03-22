import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
import { requireAdmin } from '../middleware/admin';
import { validate } from '../middleware/validate';
import { adminCreateUserSchema, adminCreateCardSchema, adminCreateProfileSchema } from '../utils/validators';

const router = Router();
const adminController = new AdminController();

router.use(requireAdmin);

router.post('/users', validate(adminCreateUserSchema), adminController.createUser);
router.post('/cards', validate(adminCreateCardSchema), adminController.createCard);
router.post('/profiles', validate(adminCreateProfileSchema), adminController.createProfile);

export default router;
