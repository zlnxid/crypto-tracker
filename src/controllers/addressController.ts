import { Request, Response } from 'express';
import { addressModel } from '../models/AddressModel';

export const addressController = {
    create: async (req: Request, res: Response) => {
        try {
            const { address, coinId } = req.body;
            const id = await addressModel.create(address, coinId);
            res.status(201).json({ id, address, coinId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create address' });
        }
    },

    getAll: async (_req: Request, res: Response) => {
        try {
            const addresses = await addressModel.getAll();
            res.json(addresses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get addresses' });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const address = await addressModel.getById(parseInt(<string>req.params.id));
            if (!address) return res.status(404).json({ error: 'Address not found' });
            res.json(address);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get address' });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const { address, coinId } = req.body;
            await addressModel.update(parseInt(<string>req.params.id), address, coinId);
            res.json({ message: 'Address updated' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update address' });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            await addressModel.delete(parseInt(<string>req.params.id));
            res.json({ message: 'Address deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete address' });
        }
    }
};