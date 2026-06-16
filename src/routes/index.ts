import { Router } from 'express';
import {auth} from '../middleware/auth';
import coinsRouter from './coins';
import addressesRouter from './addresses';
import pricesRouter from './prices';
import blockchainRouter from './blockchain';
import balanceRouter from './balance';

const router = Router();

router.use('/coins', auth, coinsRouter);
router.use('/addresses', auth, addressesRouter);
router.use('/prices', auth, pricesRouter);
router.use('/blockchain', auth, blockchainRouter);
router.use('/balance', auth, balanceRouter);

export default router;