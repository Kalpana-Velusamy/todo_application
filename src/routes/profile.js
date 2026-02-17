import express from 'express';
import { validateToken } from '../auth.middleware.js'
import { updateProfile } from '../users/index.js'


const profileRoutes = express.Router();

profileRoutes.post('/update', validateToken, updateProfile);


export default profileRoutes;
