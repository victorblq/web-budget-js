import { Controller } from "./Controller";
import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/configuration/User";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import authenticated from "../middlewares/AuthenticationMiddleware";

import 'dotenv/config';

export class AuthenticationController implements Controller {
    public path: string = "/";
    public router = Router();

    constructor(){
        this.router.post('/authenticate', this.authenticate);
        this.router.get('/logout', authenticated, this.logout);
        this.router.get('/check-token', authenticated, this.checkToken);
    }

    private async authenticate(req: Request, res: Response){
        const { username, password } = req.body;

        const user = await getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.group", "group")
            .where({username: username})
            .getOne();

        console.log(user);
        if(!user){
            return res.status(401).send("Unauthorized: User not found");
        }else{
            bcrypt.compare(password, user.password)
            .then((same) => {
                if(!same){
                    res.status(401).send("Unauthorized: Incorrect username or password");
                }else{
                    const token = jwt.sign(
                        {id: user.id, username: username},
                        process.env.JWT_PASSWORD,
                        {expiresIn: process.env.JWT_EXPIRATION_TIME});

                    delete user.password;
                    res.cookie('jwtoken', token, {httpOnly: false}).send(user);
                }
            });
        }
    }

    private logout = (req: Request, res: Response) => {
        res.clearCookie('jwtoken').sendStatus(200);
    };

    private checkToken = (req: Request, res: Response) => {
        res.sendStatus(200);
    };
}