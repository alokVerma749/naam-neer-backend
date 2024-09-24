import express from 'express';

import { login, register, verifyEmailById } from '../../controllers/v1/auth_controller.js';

const route = express.Router();

route.post('/login', login);
route.post('/register', register);
route.get('/verify-email/:userId', verifyEmailById);

export default route;
