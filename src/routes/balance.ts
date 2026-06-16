import { Router } from 'express';
import { balanceController } from '../controllers/balanceController';

const router = Router();

router.get('/history/:addressId', balanceController.getHistory);
router.get('/latest/:addressId', balanceController.getLatest);

export default router;
