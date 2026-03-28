import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

export const productRouter = Router();
const productController = new ProductController();

productRouter.get('/cards', productController.getCards);
