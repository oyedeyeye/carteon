import { Router } from 'express';
import { OrderController, WebhookController } from '../controllers/OrderController';
import { validate } from '../middleware/validate';
import { createOrderSchema } from '../utils/validators';

export const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post('/', validate(createOrderSchema), orderController.createOrder);

orderRouter.get('/verify', orderController.verifyPayment);

export const webhookRouter = Router();
const webhookController = new WebhookController();

webhookRouter.post('/payment', webhookController.handlePaymentWebhook);
