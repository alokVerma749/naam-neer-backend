import express from 'express';

import { get_user_data } from '../../controllers/v1/user_controller.js';

const route = express.Router();

route.get('/get-user-data', get_user_data);

export default route;
