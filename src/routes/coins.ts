import { Router } from 'express';
import { coinController } from '../controllers/coinController';
import { validateCoin } from '../middleware/validation';

const router = Router();

router.post('/', validateCoin, coinController.create);
router.get('/', coinController.getAll);
router.get('/:id', coinController.getById);
router.put('/:id', validateCoin, coinController.update);
router.delete('/:id', coinController.delete);

export default router;
