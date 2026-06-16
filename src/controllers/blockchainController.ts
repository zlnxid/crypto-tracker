import { Request, Response } from 'express';
import { blockchainHeightModel } from '../models/BlockchainHeightModel';

export const blockchainController = {
    getHistory: async (req: Request, res: Response) => {
        try {
            const limit = req.query.limit ? parseInt(<string>req.query.limit) : 100;
            const heights = await blockchainHeightModel.getByCoinId(parseInt(<string>req.params.coinId), limit);
            res.json(heights);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get history' });
        }
    },

    getLatest: async (req: Request, res: Response) => {
        try {
            const height = await blockchainHeightModel.getLatest(parseInt(<string>req.params.coinId));
            if (!height) return res.status(404).json({ error: 'Height not found' });
            res.json(height);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get latest height' });
        }
    }
};