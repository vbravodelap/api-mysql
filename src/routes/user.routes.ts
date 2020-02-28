import { Router } from "express";
import { getUsers, createUser, getUser, updateUser, deleteUser, getNotes, getTasks, login, whoiam } from '../controllers/user.controller';
import { checkJWT } from "../middlewares/jwt-check";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', [ checkJWT ], createUser);
router.put('/users/:id', [ checkJWT ], updateUser);
router.delete('/users/:id', deleteUser);

// Extra 
router.get('/users/notes/:id', getNotes);
router.get('/users/tasks/:id', getTasks)
router.post('/users/login', login);
router.get('/whoiam', [checkJWT], whoiam);

export default router;