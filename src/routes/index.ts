import { Router } from 'express';
import coinsRouter from './coins';
import addressesRouter from './addresses';
import pricesRouter from './prices';
import blockchainRouter from './blockchain';
import balanceRouter from './balance';

const router = Router();

router.use('/coins', coinsRouter);
router.use('/addresses', addressesRouter);
router.use('/prices', pricesRouter);
router.use('/blockchain', blockchainRouter);
router.use('/balance', balanceRouter);

export default router;