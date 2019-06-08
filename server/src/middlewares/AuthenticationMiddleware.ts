import { Response, Request } from "express";
import * as jwt from 'jsonwebtoken';
import { getConnection } from "typeorm";
import { User } from "../entity/configuration/User";

const authenticated = (req: Request, res: Response, next) => {
    const token = 
        req.body.jwtoken ||
        req.query.jwtoken ||
        req.headers['x-access-token'] ||
        req.cookies.jwtoken;

    if(!token){
        res.status(401).send("Unauthorized: No token provided");
    }else{
        jwt.verify(token, process.env.JWT_PASSWORD, async (err, decoded) => {
            if(err){
                res.status(401).send("Unauthorized: Invalid token");
            }else{
                const user = await getConnection(process.env.ENVIRONMENT).getRepository(User).find({where: {'username': decoded.username}});

                res.locals.authenticatedUser = user;

                //Refreshes token
                const token = jwt.sign({username: decoded.username}, process.env.JWT_PASSWORD, {expiresIn: process.env.JWT_EXPIRATION_TIME});
                res.cookie('jwtoken', token, {httpOnly: true});

                next();
            }
        });
    }
}

export default authenticated;