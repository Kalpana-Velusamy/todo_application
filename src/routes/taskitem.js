import express from 'express';
import { createTaskItem, updateTaskItem, getTaskItemById, getTaskItems, deleteTaskItem } from '../taskitem/index.js'
import { validateToken } from '../auth.middleware.js'
import { createTaskItemPayloadValidation, updateTaskItemPayloadValidation } from '../taskitem/validator.js';

const taskItemRoutes = express.Router();

/**route configurations for task table related functionalities */

taskItemRoutes.post('/', validateToken, createTaskItemPayloadValidation, createTaskItem)
taskItemRoutes.get('/:id', validateToken, getTaskItemById)
taskItemRoutes.get('/', validateToken, getTaskItems)
taskItemRoutes.patch('/:id', validateToken, updateTaskItemPayloadValidation, updateTaskItem)
taskItemRoutes.delete('/:id', validateToken, deleteTaskItem)

export default taskItemRoutes
