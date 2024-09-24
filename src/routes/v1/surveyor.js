import express from 'express';

import { get_surveyor_data } from '../../controllers/v1/surveyor_controller.js';

const route = express.Router();

route.get('/get-surveyor-data', get_surveyor_data);

export default route;
