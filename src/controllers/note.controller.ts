import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import { Note } from '../entity/Note';

export const getNotes = async (req: Request, res: Response): Promise<Response> => {
    const notes = await getRepository(Note).find();
    return res.json(notes);
}

export const createNote = async (req: Request, res: Response): Promise<Response> => {
    const newNote = getRepository(Note).create(req.body);
    const results = await getRepository(Note).save(newNote);
    return res.json(results);
}