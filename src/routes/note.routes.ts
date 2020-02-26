import { Router } from 'express';
import { createNote, getNotes } from '../controllers/note.controller';

const router = Router();

router.get('/notes', getNotes);
// router.get('/notes/:id', );
router.post('/notes', createNote);
// router.put('/notes/:id', );
// router.delete('/notes', );

export default router;