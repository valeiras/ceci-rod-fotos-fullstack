import { Router } from 'express';
import {
  getAllSections,
  createSection,
  getSection,
  updateSection,
  deleteSection,
  getAllSectionPictures,
} from '../controllers/sectionController.js';
import {
  validateSectionIdParam,
  validateSectionInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/').get(getAllSections).post(validateSectionInput, createSection);
router
  .route('/:sectionId')
  .get(validateSectionIdParam, getSection)
  .patch(validateSectionIdParam, validateSectionInput, updateSection)
  .delete(validateSectionIdParam, deleteSection);
router
  .route('/:sectionId/pictures')
  .get(validateSectionIdParam, getAllSectionPictures);

export default router;
