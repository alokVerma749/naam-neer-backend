import express from 'express';
import { getWaterBodies } from '../../../controllers/v1/public/waterbody.js';

const router = express.Router();

// Unprotected routes for viewing water bodies
router.get('/', getWaterBodies);    // Get all water bodies route

export default router;
