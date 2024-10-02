import express from 'express';
import { addWaterBody, getWaterBodies } from '../../controllers/v1/waterBody.js';

const router = express.Router();

// Protected routes for adding and viewing water bodies
router.post('/waterbody', addWaterBody);       // Add water body data route
router.get('/waterbodies', getWaterBodies);    // Get all water bodies added by logged in user/contributor route

export default router;
