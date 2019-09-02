import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';

import {createConnection, getRepository} from 'typeorm';

import {Controller} from './controllers/Controller';
import {AuthenticationController} from './controllers/AuthenticationController';
import {User} from './entity/configuration/User';
import {StoreType} from './entity/configuration/StoreType';
import {Profile} from './entity/configuration/Profile';
import {Group} from './entity/configuration/Group';
import {CardController} from "./controllers/registration/CardController";
import {Card} from "./entity/registration/Card";
import {CardType} from "./entity/registration/CardType";

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
        createConnection().then((connection) => {
            if(process.env.ENVIRONMENT === 'development'){
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
        user1.profile = await getRepository(Profile).save(new Profile());
        const group1 = new Group();
        group1.name = "Group1";
        group1.active = true;
        user1.group = await getRepository(Group).save(group1);

        getRepository(User).save(user1);

        const user2 = new User();
        user2.name = "Victor Carvalho";
        user2.email = "victor.blq@gmail.com";
        user2.password = "123";
        user2.username = "vagabundo";
        user2.storeType = StoreType.LOCAL;
        user2.active = true;
        user2.profile = await getRepository(Profile).save(new Profile());
        const group2 = new Group();
        group2.name = "Group2";
        group2.active = true;
        user2.group = await getRepository(Group).save(group1);

        getRepository(User).save(user2);

        const card = new Card();
        card.name = "nuBank";
        card.number = "5234218471817812";
        card.active = true;
        card.cardType = CardType.CREDIT;
        card.owner = "VICTOR BLOSQUIEVIS";
        card.creditLimit = 4100;
        card.flag = "MasterCard";

        getRepository(Card).save(card);


        // let contact1 = new Contact();
        // contact1.code = "ABC123";
        // contact1.name = "Contact 1";
        // contact1.province = "Paraná";
        // contact1.city = "Foz do Iguaçu";
        // contact1.active = true;
        // contact1.contactType = ContactType.PERSONAL;

        // contact1 = await getConnection(process.env.ENVIRONMENT).getRepository(Contact).save(contact1);

        // const telephone1 = new Telephone();
        // telephone1.numberType = NumberType.MOBILE;
        // telephone1.number = "(45) 99999-9999";
        // telephone1.contact = contact1;

        // getConnection(process.env.ENVIRONMENT).getRepository(Telephone).save(telephone1);
    }
}

const app = new App([
    new AuthenticationController(),
    new CardController()
], process.env.PORT);

app.listen();