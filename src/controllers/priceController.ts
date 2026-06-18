import { Request, Response } from 'express';
import { priceModel } from '../models/PriceModel';
import { binanceService } from '../services/binanceService';

export const priceController = {
    getCurrent: async (req: Request, res: Response) => {
        try {
            const { symbol } = req.params;
            const price = await binanceService.getCurrentPrice(<string>symbol);
            res.json({ symbol, price });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get current price' });
        }
    },

    getHistory: async (req: Request, res: Response) => {
        try {
            const limit = req.query.limit ? parseInt(<string>req.query.limit) : 100;
            const prices = await priceModel.getByCoinId(parseInt(<string>req.params.coinId), limit);
            if (!prices || prices.length === 0) return res.status(404).json({ error: 'Price history not found' });
            res.json(prices);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get history' });
        }
    },

    getHistoryFromBinance: async (req: Request, res: Response) => {
        try {
            const { symbol } = req.params;
            const interval = req.query.interval as string || '1h';
            const validIntervals = ['1m', '3m', '5m', '15m', '1h', '1d'];
            if (!validIntervals.includes(interval)) {
                return res.status(400).json({ error: 'Invalid interval' });
            }
            const limit = req.query.limit ? parseInt(<string>req.query.limit) : 100;
            const history = await binanceService.getPriceHistory(<string>symbol, interval, limit);
            res.json(history);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get history from Binance' });
        }
    },

    getLatest: async (req: Request, res: Response) => {
        try {
            const price = await priceModel.getLatest(parseInt(<string>req.params.coinId));
            if (!price) return res.status(404).json({ error: 'Price not found' });
            res.json(price);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get latest price' });
        }
    }
};
