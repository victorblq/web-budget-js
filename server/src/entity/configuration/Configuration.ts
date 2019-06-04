import { PersistentEntity } from "../PersistentEntity";
import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { MovementClass } from "../registration/MovementClass";

/**
 * Represents a Configuration
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "configurations", schema: DefaultSchemas.CONFIGURATION})
export class Configuration extends PersistentEntity{
    
    @ManyToOne(type => MovementClass, {nullable: false})
    @JoinColumn({name: "id_credit_card_class"})
    movementClass: MovementClass;
}