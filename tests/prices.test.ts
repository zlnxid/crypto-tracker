require('dotenv').config();

import request from 'supertest';
import app from '../src/app';

jest.mock('../src/services/binanceService', () => ({
    binanceService: {
        getCurrentPrice: jest.fn().mockResolvedValue(50000),
        getPriceHistory: jest.fn().mockResolvedValue([]),
        getBlockchainHeight: jest.fn().mockResolvedValue(800000),
        getBalance: jest.fn().mockResolvedValue(1.5),
    }
}));

afterAll(done => {
    done();
});

const authHeader = {
    Authorization: `Bearer ${process.env.API_KEY}`
};

describe('Prices API', () => {
    it('should get prices', async () => {
        const response = await request(app)
            .get('/api/prices/current/BTCUSDT')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 401 without auth', async () => {
        const response = await request(app)
            .get('/api/prices');
        expect(response.status).toBe(401);
    });

    it('should get price history from Binance', async () => {
        const response = await request(app)
            .get('/api/prices/history/BTCUSDT?interval=1h&limit=10')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 400 for invalid interval', async () => {
        const response = await request(app)
            .get('/api/prices/history/BTCUSDT?interval=invalid')
            .set(authHeader);
        expect(response.status).toBe(400);
    });

    it('should get stored price history', async () => {
        const response = await request(app)
            .get('/api/prices/stored/history/1')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 404 for non-existent coinId', async () => {
        const response = await request(app)
            .get('/api/prices/stored/history/999')
            .set(authHeader);
        expect(response.status).toBe(404);
    });

    it('should get latest stored price', async () => {
        const response = await request(app)
            .get('/api/prices/stored/latest/1')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 404 when no prices data found', async () => {
        const response = await request(app)
            .get('/api/prices/stored/latest/999')
            .set(authHeader);
        expect(response.status).toBe(404);
    });
});
