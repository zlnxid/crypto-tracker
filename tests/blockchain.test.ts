require('dotenv').config();

import request from 'supertest';
import app from '../src/app';
import {blockchainHeightModel} from '../src/models/BlockchainHeightModel';

jest.mock('../src/models/BlockchainHeightModel', () => ({
    blockchainHeightModel: {
        getByCoinId: jest.fn().mockResolvedValue([{ id: 1, coinId: 1, height: 1000000, }]),
        getLatest: jest.fn().mockResolvedValue({ id: 1, coinId: 1, height: 1000000 })
    }
}));

afterAll(done => {
    done();
});

const authHeader = {
    Authorization: `Bearer ${process.env.API_KEY}`
};

describe('Blockchains API', () => {
    it('should get blockchain', async () => {
        const response = await request(app)
            .get('/api/blockchain/latest/1')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 401 without auth', async () => {
        const response = await request(app)
            .get('/api/blockchain');
        expect(response.status).toBe(401);
    });

    it('should get blockchain history', async () => {
        const response = await request(app)
            .get('/api/blockchain/history/1')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 404 when no blockchain data found', async () => {
        (blockchainHeightModel.getByCoinId as jest.Mock).mockResolvedValueOnce([]);
        const response = await request(app)
            .get('/api/blockchain/history/999')
            .set(authHeader);
        expect(response.status).toBe(404);
    });
});
