import { updatePrices, updateBlockchainHeight, updateBalances, startScheduler, stopScheduler } from '../src/background/scheduler';
import { coinModel } from '../src/models/CoinModel';
import { binanceService } from '../src/services/binanceService';
import { priceModel } from '../src/models/PriceModel';
import {addressModel} from "../src/models/AddressModel";

jest.mock('../src/services/binanceService');
jest.mock('../src/models/CoinModel');
jest.mock('../src/models/PriceModel');
jest.mock('../src/models/AddressModel');

afterAll(done => {
    done();
});

describe('Background tasks', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('updatePrices', () => {
        it('should update prices for all coins successfully', async () => {
            const mockCoins = [{ id: 1, symbol: 'BTC', name: 'Bitcoin' }];
            (coinModel.getAll as jest.Mock).mockResolvedValue(mockCoins);
            (binanceService.getCurrentPrice as jest.Mock).mockResolvedValue(50000);
            (priceModel.create as jest.Mock).mockResolvedValue(1)

            await updatePrices();

            expect(coinModel.getAll).toHaveBeenCalled();
            expect(binanceService.getCurrentPrice).toHaveBeenCalledWith('BTC');
            expect(priceModel.create).toHaveBeenCalledWith(1, 50000);
        });

        it('should handle errors gracefully when Binance API fails', async () => {
            const mockCoins = [{ id: 1, symbol: 'BTC', name: 'Bitcoin' }];
            (coinModel.getAll as jest.Mock).mockResolvedValue(mockCoins);
            (binanceService.getCurrentPrice as jest.Mock).mockRejectedValue(new Error('API Error'));

            await expect(updatePrices()).resolves.not.toThrow();
        });
    });

    describe('updateBlockchainHeight', () => {
        it('should update blockchain height for all coins', async () => {
            const mockCoins = [{ id: 1, symbol: 'BTC', name: 'Bitcoin' }];
            (coinModel.getAll as jest.Mock).mockResolvedValue(mockCoins);
            (binanceService.getBlockchainHeight as jest.Mock).mockResolvedValue(800000);

            await updateBlockchainHeight();

            expect(binanceService.getBlockchainHeight).toHaveBeenCalledWith('BTC');
        });

        it('should handle errors when blockchain height update fails', async () => {
            (coinModel.getAll as jest.Mock).mockResolvedValue([]);
            await expect(updateBlockchainHeight()).resolves.not.toThrow();
        });
    });

    describe('updateBalances', () => {
        it('should update balances for all addresses', async () => {
            const mockAddresses = [{ id: 1, address: '0x123', coin_id: 1 }];
            (addressModel.getAll as jest.Mock).mockResolvedValue(mockAddresses);
            (binanceService.getBalance as jest.Mock).mockResolvedValue(1.5);

            await updateBalances();

            expect(binanceService.getBalance).toHaveBeenCalledWith('0x123');
        });
    });

    describe('Scheduler lifecycle', () => {
        it('should start and stop scheduler correctly', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            startScheduler();
            jest.advanceTimersByTime(5 * 60 * 1000);
            stopScheduler();
            expect(consoleSpy).not.toHaveBeenCalled();
        });
    });
});