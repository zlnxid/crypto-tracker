import { Request, Response, NextFunction } from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const apiKey = process.env.API_KEY;

    if (!apiKey) return res.status(500).json({ error: 'API key not configured' });
    if (!token) return res.status(401).json({ error: 'No token provided' });
    if(token !== apiKey) return res.status(401).json({ error: 'Invalid token' });

    next();
}