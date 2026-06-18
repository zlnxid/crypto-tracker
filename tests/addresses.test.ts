require('dotenv').config();

import request from 'supertest';
import app from '../src/app';
import { addressModel } from '../src/models/AddressModel';

jest.mock('../src/models/AddressModel', () => ({
    addressModel: {
        create: jest.fn().mockResolvedValue(1),
        getAll: jest.fn().mockResolvedValue([]),
        getById: jest.fn().mockResolvedValue({ id: 1, address: '1234567890', coin_id: 1 }),
        update: jest.fn().mockResolvedValue(undefined),
        delete: jest.fn().mockResolvedValue(undefined),
    }
}));

beforeEach(() => {
    (addressModel.getById as jest.Mock).mockResolvedValue({ id: 1, symbol: 'BTC', name: 'Bitcoin' });
});

afterAll(done => {
    done();
});

const authHeader = {
    Authorization: `Bearer ${process.env.API_KEY}`
};

describe('Addresses API', () => {
    it('should create an address', async () => {
        const response = await request(app)
            .post('/api/addresses')
            .set(authHeader)
            .send({ address: '1234567890', coinId: 1 });
        expect(response.status).toBe(201);
    });

    it('should return 401 without auth', async () => {
        const response = await request(app)
            .post('/api/addresses')
            .send({ address: '1234567890' });
        expect(response.status).toBe(401);
    });

    it('should get all addresses', async () => {
        const response = await request(app)
            .get('/api/addresses')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 401 without auth', async () => {
        const response = await request(app)
            .get('/api/addresses');
        expect(response.status).toBe(401);
    });

    it('should get addresses by id', async () => {
        const response = await request(app)
            .get('/api/addresses/1')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 404 for non-existent address', async () => {
        (addressModel.getById as jest.Mock).mockResolvedValueOnce(null);
        const response = await request(app)
            .get('/api/addresses/999')
            .set(authHeader);
        expect(response.status).toBe(404);
    });

    it('should update address', async () => {
        const response = await request(app)
            .put('/api/addresses/1')
            .set(authHeader)
            .send({ address: '1234567890', coinId: 2 });
        expect(response.status).toBe(200);
    });

    it('should return 401 without auth', async () => {
        const response = await request(app)
            .put('/api/addresses/1')
            .send({ address: '1234567890', coinId: 2 });
        expect(response.status).toBe(401);
    });

    it('should delete address', async () => {
        const response = await request(app)
            .delete('/api/addresses/1')
            .set(authHeader);
        expect(response.status).toBe(200);
    });

    it('should return 404 for non-existent address', async () => {
        (addressModel.getById as jest.Mock).mockResolvedValueOnce(null);
        const response = await request(app)
            .delete('/api/addresses/999')
            .set(authHeader);
        expect(response.status).toBe(404);
    });
});
