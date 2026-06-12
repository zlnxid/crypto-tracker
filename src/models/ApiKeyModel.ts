import { db } from '../database/db';

export const apiKeyModel = {
    create: (key: string): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO api_keys (key) VALUES (?)', [key], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    validate: (key: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM api_keys WHERE key = ? AND is_active = 1', [key], (err, row) => {
                if (err) reject(err);
                else resolve(!!row);
            });
        });
    }
};