import { Router } from 'express';
import { priceController } from '../controllers/priceController';

const router = Router();

router.get('/current/:symbol', priceController.getCurrent);
router.get('/history/:symbol', priceController.getHistoryFromBinance);
router.get('/stored/history/:coinId', priceController.getHistory);
router.get('/stored/latest/:coinId', priceController.getLatest);

export default router;
