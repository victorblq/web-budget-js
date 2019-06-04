import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { PeriodMovement } from "../financial/PeriodMovement";
import { MovementClass } from "../registration/MovementClass";
import { FinancialPeriod } from "../registration/FinancialPeriod";
import { Fuel } from "./Fuel";
import { Vehicle } from "../registration/Vehicle";

/**
 * Represents a Refueling
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "refuelings", schema: DefaultSchemas.JOURNAL})
export class Refueling extends PersistentEntity{

    @Column({name: "code", length: 6, unique: true})
    code: string;
    @Column({name: "accounted", nullable: false})
    accounted: boolean;
    @Column({name: "accounted_by", nullable: true})
    accountedBy: string;
    @Column({name: "first_refueling", nullable: false})
    firstRefueling: boolean;
    @Column({name: "full_tank", nullable: false})
    fullTank: boolean;
    @Column({name: "odometer", nullable: false})
    odometer: number;
    @Column({name: "distance", nullable: false})
    distance: number;
    @Column({name: "average_consumption", type: "decimal", precision: 3})
    averageConsumption: number;
    @Column({name: "liters", nullable: false, type: "decimal", precision: 3})
    liters: number;
    @Column({name: "cost", nullable: false, type: "decimal", precision: 2})
    cost: number;
    @Column({name: "cost_per_liter", nullable: false, type: "decimal", precision: 2})
    costPerLiter: number;
    @Column({name: "place", nullable: true, length: 90})
    place: string;
    @Column({name: "event_date", nullable: false})
    eventDate: Date;
    @OneToOne(type => PeriodMovement)
    @JoinColumn({name: "id_period_movement"})
    periodMovement: PeriodMovement;
    @ManyToOne(type => Vehicle, {nullable: false})
    @JoinColumn({name: "id_vehicle"})
    vehicle: Vehicle;
    @ManyToOne(type => MovementClass, {nullable: false})
    @JoinColumn({name: "id_movement_class"})
    movementClass: MovementClass;
    @ManyToOne(type => FinancialPeriod, {nullable: false})
    @JoinColumn({name: "id_financial_period"})
    financialPeriod: FinancialPeriod;
    @OneToMany(type => Fuel, fuel => fuel.refueling, {cascade: true, eager: true})
    fuels: Array<Fuel>
}