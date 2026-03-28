import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

const productService = new ProductService();

export class ProductController {
    async getCards(req: Request, res: Response) {
        try {
            const cards = await productService.getCards();
            return res.status(200).json({
                status: 'success',
                data: cards,
            });
        } catch (error) {
            console.error('Error fetching cards:', error);
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    }
}
