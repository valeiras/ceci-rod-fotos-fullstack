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
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js';

const verifyAdmin = [authenticateUser, authorizePermissions('admin')];

const router = Router();

router
  .route('/')
  .get(getAllSections)
  .post(validateSectionInput, verifyAdmin, createSection);
router
  .route('/:sectionId')
  .get(validateSectionIdParam, getSection)
  .patch(
    validateSectionIdParam,
    validateSectionInput,
    verifyAdmin,
    updateSection
  )
  .delete(validateSectionIdParam, verifyAdmin, deleteSection);
router
  .route('/:sectionId/pictures')
  .get(validateSectionIdParam, getAllSectionPictures);

export default router;
