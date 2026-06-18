import { Request, Response } from 'express';
import { coinModel } from '../models/CoinModel';

export const coinController = {
    create: async (req: Request, res: Response) => {
        try {
            const { symbol, name } = req.body;
            const id = await coinModel.create(symbol, name);
            res.status(201).json({ id, symbol, name });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create coin' });
        }
    },

    getAll:  async (_req: Request, res: Response) => {
        try {
            const coins = await coinModel.getAll();
            res.json(coins);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get coins' });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const coin = await coinModel.getById(parseInt(<string>req.params.id));
            if (!coin) return res.status(404).json({ error: 'Coin not found' });
            res.json(coin);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get coin' });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const existingCoin = await coinModel.getById(parseInt(<string>req.params.id));
            if (!existingCoin) return res.status(404).json({ error: 'Coin not found' });
            await coinModel.update(parseInt(<string>req.params.id), req.body.symbol, req.body.name);
            res.json({ message: 'Coin updated' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update coin' });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const existingCoin = await coinModel.getById(parseInt(<string>req.params.id));
            if (!existingCoin) return res.status(404).json({ error: 'Coin not found' });
            await coinModel.delete(parseInt(<string>req.params.id));
            res.json({ message: 'Coin deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete coin' });
        }
    }
};