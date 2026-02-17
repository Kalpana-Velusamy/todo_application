import express from 'express';
import userRoutes from './routes/user.js'
import taskRoutes from './routes/task.js'
import authRoutes from './routes/auth.js'
import taskItemRoutes from './routes/taskitem.js'
import profileRoutes from './routes/profile.js'
import dotenv from 'dotenv'; /** dot env is used to set the token secret requried for the token generation and validation */

dotenv.config();

const app = express()

app.use(express.json())
app.use('/users', userRoutes)
app.use('/task', taskRoutes)
app.use('/auth', authRoutes)
app.use('/taskitem', taskItemRoutes)
app.use('/profile',profileRoutes)


app.listen(3000, () => { console.log("server is running on http://localhost:3000") });
