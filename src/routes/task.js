import express from 'express';
import { createTask, getTaskById, getTasks, updateTask, deleteTask } from '../tasks/index.js'
import { validateToken } from '../auth.middleware.js'
import { createTaskPayloadValidation, updateTaskPayloadValidation } from '../tasks/validator.js';

const taskRoutes = express.Router();

/**route configurations for task table related functionalities */

taskRoutes.post('/', validateToken, createTaskPayloadValidation, createTask)
taskRoutes.get('/:id', validateToken, getTaskById)
taskRoutes.get('/', validateToken, getTasks)
taskRoutes.patch('/:id', validateToken, updateTaskPayloadValidation, updateTask)
taskRoutes.delete('/:id', validateToken, deleteTask)

export default taskRoutes
