import { Router } from 'express';
import { blockchainController } from '../controllers/blockchainController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/history/:coinId', auth, blockchainController.getHistory);
router.get('/latest/:coinId', auth, blockchainController.getLatest);

export default router;
