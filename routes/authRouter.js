import { Router } from 'express';
import {
  register,
  login,
  logout,
  authenticateImageKit,
  verifyAdmin,
} from '../controllers/authController.js';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);
router.get(
  '/imagekit',
  [authenticateUser, authorizePermissions('admin')],
  authenticateImageKit
);
router.get(
  '/verifyAdmin',
  [authenticateUser, authorizePermissions('admin')],
  verifyAdmin
);

export default router;
