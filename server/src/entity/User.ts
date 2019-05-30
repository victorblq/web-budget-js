import { AbstractEntity } from "./AbstractEntity";
import { Entity } from "typeorm";

@Entity({name: "users"})
export class User extends AbstractEntity {
    
}