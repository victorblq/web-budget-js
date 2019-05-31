import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

import { createConnection, getConnection } from 'typeorm';

import { Controller } from './controllers/Controller';
import { AuthenticationController } from './controllers/AuthenticationController';
import { User } from './entity/configuration/User';
import { StoreType } from './entity/configuration/StoreType';
import { Profile } from './entity/configuration/Profile';
import { Group } from './entity/configuration/Group';

export class App {
    public app: express.Application;
    public port: string;

    constructor( controllers: Array<Controller>, port:string ){
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(cookieParser());
    }

    private initializeControllers(controllers: Array<Controller>){
        controllers.forEach((controller: Controller) => {
            this.app.use(controller.path, controller.router);
        });
    }

    listen(){
        const environment = process.env.ENVIRONMENT;
        createConnection(environment).then((connection) => {
            if(environment === 'development'){
                connection.synchronize(true).then(() => {
                    this.seedDatabase();
                });
            }else{
                connection.runMigrations();
            }

            this.app.listen(this.port, () => {
                console.log(`App listening at port ${this.port}`);
            });
        });
    }

    private async seedDatabase(){
        const user1 = new User();
        user1.name = "Victor Carvalho";
        user1.email = "victor.blq@gmail.com";
        user1.password = "teste123";
        user1.username = "victorblq";
        user1.storeType = StoreType.LOCAL;
        user1.active = true;
        user1.profile = await getConnection(process.env.ENVIRONMENT).getRepository(Profile).save(new Profile());
        const group1 = new Group();
        group1.name = "Group1";
        group1.active = true; 
        user1.group = await getConnection(process.env.ENVIRONMENT).getRepository(Group).save(group1);

        getConnection(process.env.ENVIRONMENT).getRepository(User).save(user1);
    }
}

const app = new App([
    new AuthenticationController()
], process.env.PORT);

app.listen();