import {Controller} from "../Controller";
import {Request, Response, Router} from "express";
import {getRepository} from "typeorm";
import {Card} from "../../entity/registration/Card";
import authenticated from "../../middlewares/AuthenticationMiddleware";

export class CardController implements Controller{
    public path: string = "/registration/card";
    public router: Router = Router();

    constructor(){
        this.router.get("/", authenticated, this.getAllCards);
    }

    private async getAllCards(req: Request, res: Response) {
        res.send(await getRepository(Card)
            .createQueryBuilder("card")
            .where("card.number LIKE :filter", {filter: `%${req.query.filter}%`})
            .orWhere("card.name LIKE :filter", {filter: `%${req.query.filter}%`})
            .orWhere("card.owner LIKE :filter", {filter: `%${req.query.filter}%`})
            .orWhere("card.flag LIKE :filter", {filter: `%${req.query.filter}%`})
            .getMany()
        );
    };
}