import { Router } from 'express';
import { addressController } from '../controllers/addressController';
import { validateAddress } from '../middleware/validation';

const router = Router();

router.post('/', validateAddress, addressController.create);
router.get('/', addressController.getAll);
router.get('/:id', addressController.getById);
router.put('/:id', validateAddress, addressController.update);
router.delete('/:id', addressController.delete);

export default router;
