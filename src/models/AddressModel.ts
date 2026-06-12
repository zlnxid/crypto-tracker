import { db } from '../database/db';

export const addressModel = {
    create: (address: string, coinId: number): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO addresses (address, coin_id) VALUES (?, ?)', [address, coinId], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    getAll: (): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM addresses', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    getById: (id: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM addresses WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    update: (id: number, address: string, coinId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            db.run('UPDATE addresses SET address = ?, coin_id = ? WHERE id = ?', [address, coinId, id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    delete: (id: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM addresses WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};