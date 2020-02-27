import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import { User } from '../entity/User';    

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({ id: req.params.id });
    return res.json(user);
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const newUser = getRepository(User).create(req.body);
    const results = await getRepository(User).save(newUser);
    return res.json(results);
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({ id: req.params.id });

    if(user) {
        getRepository(User).merge(user, req.body);
        const results = await getRepository(User).save(user);
        return res.json(results);
    }

    return res.status(404).json({ msg: 'Not user found' });
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).delete({ id: req.params.id });
    return res.json(user);
}

export const getNotes = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({ id: req.params.id }, { relations: ["notes"] });

    return res.json(user?.notes);
}

export const getTasks = async(req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({ id: req.params.id }, { relations: ["tasks"] });
    return res.json(user?.tasks);
}