import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

import { createConnection } from 'typeorm';

import { Controller } from './controllers/Controller';

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

    private seedDatabase(){
        console.log("Seed database here");
    }
}

const app = new App([], process.env.PORT);

app.listen();