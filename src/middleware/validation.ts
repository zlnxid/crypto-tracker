import { Request, Response, NextFunction } from 'express';

export function validateCoin(req: Request, res: Response, next: NextFunction) {
    const { symbol, name } = req.body;
    if (!symbol || !name) return res.status(400).json({ error: 'Symbol and name are required' });
    next();
}

export function validateAddress(req: Request, res: Response, next: NextFunction) {
    const { address, coinId } = req.body;
    if (!address || !coinId) return res.status(400).json({ error: 'Address and coinId are required' });
    next();
}

