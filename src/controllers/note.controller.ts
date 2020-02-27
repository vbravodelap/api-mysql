import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import { Note } from '../entity/Note';
import { User } from '../entity/User';

export const getNotes = async (req: Request, res: Response): Promise<Response> => {
    const notes = await getRepository(Note).find({ relations: ["user"] });
    return res.json(notes);
}

export const createNote = async (req: Request, res: Response): Promise<Response> => {
    const newNote = getRepository(Note).create(req.body);
    const results = await getRepository(Note).save(newNote);
    return res.json(results);
}

export const getNote = async (req: Request, res: Response): Promise<Response> => {
    const note = await getRepository(Note).findOne({id: req.params.id});
    return res.json(note);
}

export const updateNote = async (req: Request, res: Response): Promise<Response> => {
    const note = await getRepository(Note).findOne({ id: req.params.id });

    if(note) {
        getRepository(Note).merge(note, req.body);
        const results = await getRepository(Note).save(note);
        return res.json(note);
    }

    return res.json('Note not found');
}

export const deleteNote = async (req: Request, res: Response): Promise<Response> => {
    const note = await getRepository(Note).delete({ id: req.params.id });
    return res.json(note);
}

export const getNotesByUserId = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({id: req.params.id}, {relations: ["notes"]});
    
    return res.json({
        notes: user?.notes
    })
} 
