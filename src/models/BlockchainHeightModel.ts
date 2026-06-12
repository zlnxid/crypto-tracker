import {db} from '../database/db';

export const blockchainHeightModel = {
    create: (coinId: number, height: number): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO blockchain_height (coin_id, height) VALUES (?, ?)', [coinId, height], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    getByCoinId: (coinId: number, limit: number = 100): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM blockchain_height WHERE coin_id = ? ORDER BY timestamp DESC LIMIT ?', [coinId, limit], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    getLatest: (coinId: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM blockchain_height WHERE coin_id = ? ORDER BY timestamp DESC LIMIT 1', [coinId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }
};