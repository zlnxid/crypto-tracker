import {db} from '../database/db';

export const coinModel = {
    create: (symbol: string, name: string): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO coins (symbol, name) VALUES (?, ?)', [symbol, name], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    },

    getAll: (): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM coins', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    getById: (id: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM coins WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    update: (id: number, symbol: string, name: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            db.run('UPDATE coins SET symbol = ?, name = ? WHERE id = ?', [symbol, name, id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    },

    delete: (id: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM coins WHERE id = ?', [id], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};