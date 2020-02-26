import express from 'express';
import 'reflect-metadata';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm'

// Route imports
import userRoutes from './routes/user.routes';
import noteRoutes from './routes/note.routes';


const app = express();
createConnection();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(noteRoutes);

app.listen(3000);
console.log('Server on port: ', 3000);