import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { CostCenter } from "./CostCenter";
import { MovementClassType } from "./MovementClassType";

/**
 * Represents a MovementClass
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "movement_classes", schema: DefaultSchemas.REGISTRATION})
export class MovementClass extends PersistentEntity{

    @Column({name: "name", nullable: false, length: 45})
    name: string;
    @Column({name: "budget", nullable: true, type: "decimal", precision: 2})
    budget: number;
    @Column({name: "active", nullable: false})
    active: boolean;
    @Column({name: "movement_class_type", nullable: false, enum: MovementClassType})
    movementClassType: MovementClassType;
    @ManyToOne(type => CostCenter)
    @JoinColumn({name: "id_cost_center"})
    costCenter: CostCenter;

    totalMovements: number;
}