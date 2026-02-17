import express from 'express';
import { createUser } from '../users/index.js'

const userRoutes = express.Router();

// user creation route config
userRoutes.post('/', createUser)


export default userRoutes
