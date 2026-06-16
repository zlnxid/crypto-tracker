import { Router } from 'express';
import { priceController } from '../controllers/priceController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/current/:symbol', auth, priceController.getCurrent);
router.get('/history/:symbol', auth, priceController.getHistoryFromBinance);
router.get('/stored/history/:coinId', auth, priceController.getHistory);
router.get('/stored/latest/:coinId', auth, priceController.getLatest);

export default router;
