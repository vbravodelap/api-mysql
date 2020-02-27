import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';    
import bcrypt from 'bcrypt';

const config = require('../configs/config');

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({ id: req.params.id });
    return res.json(user);
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne({ email: req.body.email });

    if(user) {
        const result = await bcrypt.compare(req.body.password, user.password);

        if(result) {
            const payload = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
            const token = jwt.sign(user, config.secret_key, { expiresIn: 60 * 60 * 60});
            return res.json(token);
        }
    }

    return res.json('Error trying to login');
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;

    const salt = await bcrypt.genSalt(10);
    const password: any = await bcrypt.hash(req.body.password, salt);

    user.password = password;

    const newUser = await getRepository(User).save(user).catch(err => {
        if(err.code = 'ER_DUP_ENTRY') {
            return res.json('Este correo ya esta registrado.');
        }
    });
    
    return res.json(newUser);
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