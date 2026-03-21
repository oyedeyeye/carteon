import { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../src/middleware/admin';

describe('Admin Middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        nextFunction = jest.fn();
        process.env.ADMIN_API_KEY = 'super_secret_admin_key';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call next() if the correct API key is provided', () => {
        mockRequest = {
            headers: {
                'x-admin-api-key': 'super_secret_admin_key',
            },
        };

        requireAdmin(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 401 if API key is completely missing', () => {
        mockRequest = { headers: {} };

        requireAdmin(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Unauthorized: Admin API key missing',
        });
    });

    it('should return 401 if incorrect API key is provided', () => {
        mockRequest = {
            headers: {
                'x-admin-api-key': 'wrong_key',
            },
        };

        requireAdmin(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Unauthorized: Invalid Admin API key',
        });
    });
});
