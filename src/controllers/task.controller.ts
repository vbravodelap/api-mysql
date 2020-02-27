import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Task } from '../entity/Task';

export const getTasks = async(req: Request, res: Response): Promise<Response> => {
    const tasks = getRepository(Task).find({ relations: ["user"] });
    return res.json(tasks);
}

export const getTask = async (req: Request, res: Response): Promise<Response> => {
    const task = getRepository(Task).findOne({ id: req.params.id });
    return res.json(task);
}

export const createTask = async(req: Request, res: Response): Promise<Response> => {
    const task = getRepository(Task).create(req.body);
    const results = await getRepository(Task).save(task);
    return res.json(results);
}

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
    const task = await getRepository(Task).findOne({ id: req.params.id });
    
    if(task) {
        getRepository(Task).merge(task, req.body);
        const results = getRepository(Task).save(task);
        return res.json(task);
    }

    return res.json('Task not found');
}

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    const task = await getRepository(Task).delete({ id: req.params.id });
    return res.json(task);
}