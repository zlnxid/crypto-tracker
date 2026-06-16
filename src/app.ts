import express from 'express';
import routes from './routes';
import {errorHandler} from './middleware/errorHandler';
import {initDatabase} from './database/db';
import { startScheduler, stopScheduler } from './background/scheduler';

const app = express();

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

async function start() {
    await initDatabase();
    startScheduler();
    app.listen(process.env.PORT || 3000, () => console.log('Server started on port 3000'));
}

function shutdown() {
    console.log('Shutting down...');
    stopScheduler();
    process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();