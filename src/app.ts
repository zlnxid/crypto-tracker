import express from 'express';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { initDatabase } from './database/db';
import { startScheduler, stopScheduler } from './background/scheduler';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./docs/openapi.yaml');

const app = express();
export default app;

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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