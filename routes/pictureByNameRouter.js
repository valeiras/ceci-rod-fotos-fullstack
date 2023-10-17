import { Router } from 'express';
import { getPictureByName } from '../controllers/pictureByNameController.js';
import { validatePictureName } from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/:pictureName').get(validatePictureName, getPictureByName);

export default router;
