import { Router } from 'express';
import { blockchainController } from '../controllers/blockchainController';

const router = Router();

router.get('/history/:coinId', blockchainController.getHistory);
router.get('/latest/:coinId', blockchainController.getLatest);

export default router;
