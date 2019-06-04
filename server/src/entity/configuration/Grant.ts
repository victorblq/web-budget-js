import { PersistentEntity } from "../PersistentEntity";
import { Group } from "./Group";
import { ManyToOne, JoinColumn, Entity } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { Authorization } from "./Authorization";

/**
 * This is responsible to create the link between a Group and a Authorization
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 30/05/2019
 */
@Entity({name: "grants", schema: DefaultSchemas.CONFIGURATION})
export class Grant extends PersistentEntity {

    @ManyToOne(type => Group, group => group.grants, {nullable: false})
    @JoinColumn({name: "id_group"})
    group: Group;

    @ManyToOne(type => Authorization, {nullable: false})
    @JoinColumn({name: "id_authorization"})
    authorization: Authorization;
}