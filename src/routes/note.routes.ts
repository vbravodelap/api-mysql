import { Router } from 'express';
import { createNote, getNotes, getNote, updateNote, deleteNote, getNotesByUserId } from '../controllers/note.controller';

const router = Router();

// CRUD
router.get('/notes', getNotes);
router.get('/notes/:id', getNote);
router.post('/notes', createNote);
router.put('/notes/:id', updateNote);
router.delete('/notes', deleteNote);

// Extra
router.get('/notes/user/:id', getNotesByUserId)

export default router;