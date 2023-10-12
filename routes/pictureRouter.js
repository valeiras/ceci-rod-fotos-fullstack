import { Router } from 'express';
import {
  getAllPictures,
  createPicture,
  getPicture,
  updatePicture,
  deletePicture,
} from '../controllers/pictureController.js';
import {
  validatePictureIdParam,
  validatePictureInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/').get(getAllPictures).post(validatePictureInput, createPicture);
router
  .route('/:pictureId')
  .get(validatePictureIdParam, getPicture)
  .patch(validatePictureIdParam, updatePicture)
  .delete(validatePictureIdParam, deletePicture);

export default router;
