import { Router } from 'express';
import { balanceController } from '../controllers/balanceController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/history/:addressId', auth, balanceController.getHistory);
router.get('/latest/:addressId', auth, balanceController.getLatest);

export default router;
