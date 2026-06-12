import sqlite3 from 'sqlite3';
import {readFileSync} from 'fs';
import {join} from 'path';

const dbPath = process.env.DB_PATH || join(__dirname, '../../database/crypto-tracker.db');

export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('DB connection error: ', err);
    else console.log('Connected to SQLite');
});

export function initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
        const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8');
        db.exec(schema, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}
