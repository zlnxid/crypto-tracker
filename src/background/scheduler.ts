import {priceModel} from '../models/PriceModel';
import {blockchainHeightModel} from '../models/BlockchainHeightModel';
import {balanceModel} from '../models/BalanceModel';
import {binanceService} from '../services/binanceService';
import {coinModel} from '../models/CoinModel';
import {addressModel} from '../models/AddressModel';

let priceInterval: NodeJS.Timeout;
let blockchainInterval: NodeJS.Timeout;
let balanceInterval: NodeJS.Timeout;

export async function updatePrices() {
    try {
        const coins = await coinModel.getAll();
        for (const coin of coins) {
            const price = await binanceService.getCurrentPrice(coin.symbol);
            await priceModel.create(coin.id, price);
        }
    } catch (error) {
        console.error('Error updating prices:', error);
    }
}

export async function updateBlockchainHeight() {
    try {
        const coins = await coinModel.getAll();
        for (const coin of coins) {
            const height = await binanceService.getBlockchainHeight(coin.symbol);
            await blockchainHeightModel.create(coin.id, height);
        }
    } catch (error) {
        console.error('Error updating blockchain height:', error);
    }
}

export async function updateBalances() {
    try {
        const addresses = await addressModel.getAll();
        for (const addr of addresses) {
            const balance = await binanceService.getBalance(addr.address);
            await balanceModel.create(addr.id, balance);
        }
    } catch (error) {
        console.error('Error updating balances:', error);
    }
}

export function startScheduler() {
    priceInterval = setInterval(updatePrices, 5 * 60 * 1000);   // 5 minutes
    blockchainInterval = setInterval(updateBlockchainHeight, 10 * 60 * 1000);    // 10 minutes
    balanceInterval = setInterval(updateBalances, 15 * 60 * 1000);   // 15 minutes
}

export function stopScheduler() {
    clearInterval(priceInterval);
    clearInterval(blockchainInterval);
    clearInterval(balanceInterval);
}
