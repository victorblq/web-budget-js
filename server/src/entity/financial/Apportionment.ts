import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { Movement } from "./Movement";
import { CostCenter } from "../registration/CostCenter";
import { MovementClass } from "../registration/MovementClass";

/**
 * Represents a Apportionment
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "apportionments", schema: DefaultSchemas.FINANCIAL})
export class Apportionment extends PersistentEntity {
    
    @Column({name: "code", nullable: false, length: 6, unique: true})
    code: string;
    @Column({name: "value", nullable: false, type: "decimal"})
    value: number;
    @ManyToOne(type => Movement, movement => movement.apportionments, {nullable: false})
    @JoinColumn({name: "id_movement"})
    movement: Movement;
    @ManyToOne(type => CostCenter, {nullable: false})
    @JoinColumn({name: "id_cost_center"})
    costCenter:CostCenter;
    @ManyToOne(type => MovementClass, {nullable: false})
    @JoinColumn({name: "id_movement_class"})
    movementClass: MovementClass;
}