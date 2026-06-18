require('dotenv').config();

import request from 'supertest';
import app from '../src/app';
import {balanceModel} from '../src/models/BalanceModel';

jest.mock('../src/models/BalanceModel', () => ({
    balanceModel: {
        getByAddressID: jest.fn().mockResolvedValue([{ id: 1, coinId: 1, balance: 1.5 }]),
        getLatest: jest.fn().mockResolvedValue({ id: 1, coinId: 1, balance: 1.5 })
    }
}))

afterAll(done => {
    done();
});

const authHeader = {
    Authorization: `Bearer ${process.env.API_KEY}`
};

describe('Balances API', () => {
    it('should get balances', async () => {
        const response = await request(app)
            .get('/api/balance/latest/1')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 401 without auth', async () => {
        const response = await request(app)
            .get('/api/balance');
        expect(response.status).toBe(401);
    });

    it('should get balance history', async () => {
        const response = await request(app)
            .get('/api/balance/history/1')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 404 when no balance data found', async () => {
        (balanceModel.getByAddressID as jest.Mock).mockResolvedValueOnce([]);
        const response = await request(app)
            .get('/api/balance/history/999')
            .set(authHeader);
        expect(response.status).toBe(404);
    })
});
