import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import auth_route from './routes/v1/auth.js';
import user_route from './routes/v1/user.js';
import water_body_route from './routes/v1/waterbody.js';
import public_water_body from './routes/v1/public/waterbody.js';
import { authorizeRoles, protectRoute } from './middlewares/protectRoute.js';
import { ROLES } from './enums/roles.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// public API's
app.use('/api/v1/get-all-waterbodies', public_water_body);

// Auth API's
app.use('/api/v1/auth', auth_route);
app.use('/api/v1/user', protectRoute, authorizeRoles(ROLES.USER, ROLES.SURVEYOR), user_route);

// Water body API's
app.use('/api/v1/', protectRoute, authorizeRoles(ROLES.USER, ROLES.SURVEYOR), water_body_route);

export default app;
