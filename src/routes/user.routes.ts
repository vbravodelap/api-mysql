import { Router } from "express";
import { getUsers, createUser, getUser, updateUser, deleteUser, getNotes, getTasks } from '../controllers/user.controller';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Extra 
router.get('/users/notes/:id', getNotes);
router.get('/users/tasks/:id', getTasks)

export default router;