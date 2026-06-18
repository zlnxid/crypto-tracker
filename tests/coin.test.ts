require('dotenv').config();

import request from 'supertest';
import app from '../src/app';
import {coinModel} from "../src/models/CoinModel";

jest.mock('../src/models/CoinModel', () => ({
    coinModel: {
        create: jest.fn().mockResolvedValue(1),
        getAll: jest.fn().mockResolvedValue([]),
        getById: jest.fn().mockResolvedValue({ id: 1, symbol: 'BTC', name: 'Bitcoin' }),
        update: jest.fn().mockResolvedValue(undefined),
        delete: jest.fn().mockResolvedValue(undefined),
    }
}));

beforeEach(() => {
    (coinModel.getById as jest.Mock).mockResolvedValue({ id: 1, symbol: 'BTC', name: 'Bitcoin' });
});

afterAll(done => {
    done();
});

const authHeader = {
    Authorization: `Bearer ${process.env.API_KEY}`
};

describe('Coins API', () => {
    it('should create a coin', async () => {
        const response = await request(app)
            .post('/api/coins')
            .set(authHeader)
            .send({ symbol: 'BTC', name: 'Bitcoin' });
        expect(response.status).toBe(201);
    });

    it('should return 401 without auth', async () => {
        const response = await request(app)
            .post('/api/coins')
            .send({ symbol: 'BTC', name: 'Bitcoin' });
        expect(response.status).toBe(401);
    });

    it('should get all coins', async () => {
        const response = await request(app)
            .get('/api/coins')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 401 without auth', async () => {
        const response = await request(app)
            .get('/api/coins');
        expect(response.status).toBe(401);
    });

    it('should get coin by id', async () => {
        const response = await request(app)
            .get('/api/coins/1')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 404 for non-existent coin)', async () => {
        (coinModel.getById as jest.Mock).mockResolvedValueOnce(null);
        const response = await request(app)
            .get('/api/coins/999')
            .set(authHeader);
        expect(response.status).toBe(404);
    });

    it('should update coin', async () => {
        (coinModel.update as jest.Mock).mockResolvedValue({ id: 1, symbol: 'BTC', name: 'Bitcoin' });
        const response = await request(app)
            .put('/api/coins/1')
            .set(authHeader)
            .send({ symbol: 'USD', name: 'Dollar' });
        expect(response.status).toBe(200);
    });

    it('should return 400 on invalid update data', async () => {
        const response = await request(app)
            .put('/api/coins/1')
            .set(authHeader)
            .send({ symbol: '' });
        expect(response.status).toBe(400);
    });

    it('should delete coin', async () => {
        const response = await request(app)
            .delete('/api/coins/1')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 404 for non-existent coin', async () => {
        (coinModel.getById as jest.Mock).mockResolvedValueOnce(null);
        const response = await request(app)
            .delete('/api/coins/999')
            .set(authHeader);
        expect(response.status).toBe(404);
    });
});
