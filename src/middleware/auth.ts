import { Request, Response, NextFunction } from 'express';
import { apiKeyModel } from '../models/ApiKeyModel';

export async function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const isValid = await apiKeyModel.validate(token);
    if (!isValid) return res.status(401).json({ error: 'Invalid token' });

    next();
}