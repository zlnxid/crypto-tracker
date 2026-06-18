import { Request, Response } from 'express';
import { balanceModel } from '../models/BalanceModel';

export const balanceController = {
    getHistory: async(req: Request, res: Response) => {
        try {
            const limit = req.query.limit ? parseInt(<string>req.query.limit) : 100;
            const balances = await balanceModel.getByAddressID(parseInt(<string>req.params.addressId), limit);
            if (!balances || balances.length === 0) return res.status(404).json({ error: 'Balance history not found' });
            res.json(balances);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get history' });
        }
    },

    getLatest: async (req: Request, res: Response) => {
        try {
            const balance = await balanceModel.getLatest(parseInt(<string>req.params.addressId));
            if (!balance) return res.status(404).json({ error: 'Balance not found' });
            res.json(balance);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get latest balance' });
        }
    }
}