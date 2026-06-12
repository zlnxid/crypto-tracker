import {db} from '../database/db';

export const balanceModel = {
    create: (addressId: number, balance: number): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO balances (address_id, balance) VALUES (?, ?)', [addressId, balance], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    getAll: (): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM balances', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        })
    },

    getByAddressID: (addressId: number, limit: number = 100): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM balances WHERE address_id = ? ORDER BY timestamp DESC LIMIT ?', [addressId, limit], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    getLatest: (addressId: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM balances WHERE address_id = ? ORDER BY timestamp DESC LIMIT 1', [addressId], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        })
    }
};