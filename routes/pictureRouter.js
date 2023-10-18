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
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js';

const verifyAdmin = [authenticateUser, authorizePermissions('admin')];

const router = Router();

router
  .route('/')
  .get(getAllPictures)
  .post(validatePictureInput, verifyAdmin, createPicture);
router
  .route('/:pictureId')
  .get(validatePictureIdParam, getPicture)
  .patch(validatePictureIdParam, verifyAdmin, updatePicture)
  .delete(validatePictureIdParam, verifyAdmin, deletePicture);

export default router;
