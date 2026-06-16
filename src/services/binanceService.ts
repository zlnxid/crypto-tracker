import axios from 'axios';

const BINANCE_API_URL = process.env.BINANCE_API_URL || 'https://api.binance.com/api/v3';
const TIMEOUT = 5000;
const MAX_RETRIES = 3;

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<any> {
    try {
        const response = await axios.get(url, { timeout: TIMEOUT });
        return response.data;
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchWithRetry(url, retries - 1);
        }
        throw error;
    }
}

export const binanceService = {
    getCurrentPrice: async (symbol: string): Promise<any> => {
        const data = await fetchWithRetry(`${BINANCE_API_URL}/ticker/price?symbol=${symbol}USDT`);
        return parseFloat(data.price);
    },

    getPriceHistory: async (symbol: string, interval: string = '1h', limit: number = 100): Promise<any[]> => {
        return fetchWithRetry(`${BINANCE_API_URL}/klines?symbol=${symbol}USDT&interval=${interval}&limit=${limit}`)
    }
};