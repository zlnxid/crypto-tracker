import {db} from '../database/db';

export const priceModel = {
    create: (coinId: number, price: number): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO prices (coin_id, price) VALUES (?, ?)', [coinId, price], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    getByCoinId: (coinId: number, limit: number = 100): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM prices WHERE coin_id = ? ORDER BY timestamp DESC LIMIT ?', [coinId, limit], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    getLatest: (coinId: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM prices WHERE coin_id = ? ORDER BY timestamp DESC LIMIT 1', [coinId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
};