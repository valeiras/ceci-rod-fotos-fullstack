import { Router } from 'express';
import {
  register,
  login,
  logout,
  authenticateImageKit,
} from '../controllers/authController.js';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);
router.get('/imagekit', authenticateImageKit);

export default router;
