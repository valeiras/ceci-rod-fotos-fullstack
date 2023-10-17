import { Router } from 'express';
import { getSectionByName } from '../controllers/sectionByNameController.js';
import { validateSectionName } from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/:sectionName').get(validateSectionName, getSectionByName);

export default router;
