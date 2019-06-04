import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { FuelType } from "./FuelType";
import { Refueling } from "./Refueling";

/**
 * Represents a Fuel
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "fuels", schema: DefaultSchemas.JOURNAL})
export class Fuel extends PersistentEntity{

    @Column({name: "liters", nullable: false, type: "decimal", precision: 3})
    liters: number;
    @Column({name: "value_per_litter", nullable: false, type: "decimal", precision: 2})
    valuePerLitter: number;
    @Column({name: "fuel_type", nullable: false, enum: FuelType, type: "text"})
    fuelType: FuelType;
    @ManyToOne(type => Refueling, refueling => refueling.fuels, {nullable: false})
    refueling: Refueling;
}