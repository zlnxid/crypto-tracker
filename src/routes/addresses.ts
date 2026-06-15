import { Router } from 'express';
import { addressController } from '../controllers/addressController';
import { auth } from '../middleware/auth';
import { validateAddress } from '../middleware/validation';

const router = Router();

router.post('/', auth, validateAddress, addressController.create);
router.get('/', auth, addressController.getAll);
router.get('/:id', auth, addressController.getById);
router.put('/:id', auth, validateAddress, addressController.update);
router.delete('/:id', auth, addressController.delete);

export default router;
