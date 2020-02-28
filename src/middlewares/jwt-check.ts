import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";
const config = require('../configs/config');

const secret_key: any = 'vOQVuset3ncI52jXc45uSVMs2ufcOlIp6gZLaTNFn1GOxcxuBx1aITyM6V5iNLlG7iEYhBBtKXfMDcH3LYtCn4HP21aTOjAGw1yd';

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        return res.status(422).send({ message: 'Not authorized' });
    }

    const token: any = req.headers.authorization;
    
    try {
        const payload: any = jwt.decode(token, secret_key);
    }catch(err) {
        console.log(err);
    }

    next();
}