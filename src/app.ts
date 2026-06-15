import express from 'express';
import routes from './routes';
import {errorHandler} from './middleware/errorHandler';
import {initDatabase} from './database/db';

const app = express();

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

async function start() {
    await initDatabase();
    app.listen(process.env.PORT || 3000, () => console.log('Server started on port 3000'));
}

start();