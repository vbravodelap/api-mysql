import express from 'express';
import 'reflect-metadata';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm'

// Route imports
import userRoutes from './routes/user.routes';
import noteRoutes from './routes/note.routes';
import taskRoutes from './routes/task.routes';


const app = express();
createConnection();

const config = require('./configs/config');
app.set('secret_key', config.secret_key);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(userRoutes);
app.use(noteRoutes);
app.use(taskRoutes);

app.listen(3000);
console.log('Server on port: ', 3000);