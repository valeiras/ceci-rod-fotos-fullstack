import { Router } from 'express';
import { uploadStaticAssets } from '../controllers/staticAssetsController.js';

const router = Router();

router.get('/', uploadStaticAssets);

export default router;
