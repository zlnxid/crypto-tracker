import { Router } from 'express';
import { coinController } from '../controllers/coinController';
import { auth } from '../middleware/auth';
import { validateCoin } from '../middleware/validation';

const router = Router();

router.post('/', auth, validateCoin, coinController.create);
router.get('/', auth, coinController.getAll);
router.get('/:id', auth, coinController.getById);
router.put('/:id', auth, validateCoin, coinController.update);
router.delete('/:id', auth, coinController.delete);

export default router;
