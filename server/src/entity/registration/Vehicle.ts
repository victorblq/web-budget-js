import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { CostCenter } from "./CostCenter";
import { VehicleType } from "./VehicleType";

/**
 * Represents a vehicle
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "vehicles", schema: DefaultSchemas.REGISTRATION})
export class Vehicle extends PersistentEntity{

    @Column({name: "identification", nullable: false, length: 90})
    identification: string;
    @Column({name: "brand", nullable: false, length: 90})
    brand: string;
    @Column({name: "model", nullable: false, length: 90})
    model: string;
    @Column({name: "license_plate", nullable: false, length: 11})
    licensePlate: string;
    @Column({name: "model_year", nullable: true})
    modelYear: number;
    @Column({name: "manufacturing_year", nullable: true})
    manufacturingYear: number;
    @Column({name: "odometer", nullable: false})
    odometer: number;
    @Column({name: "fuel_capacity", nullable: false})
    fuelCapacity: number;
    @Column({name: "active", nullable: false})
    active: boolean;
    @Column({name: "vehicle_type", nullable: false, enum: VehicleType, type: "text"})
    vehicleType: VehicleType;
    @ManyToOne(type => CostCenter)
    @JoinColumn({name: "id_cost_center"})
    costCenter: CostCenter;
}