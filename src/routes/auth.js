import express from 'express';

/** imports regiser user and login user fuctions from index.js file from auth folder*/

import { registerUser, loginUser } from '../auth/index.js'

const authRoutes = express.Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);



export default authRoutes;
