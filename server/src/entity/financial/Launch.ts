import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { FinancialPeriod } from "../registration/FinancialPeriod";
import { FixedMovement } from "./FixedMovement";
import { PeriodMovement } from "./PeriodMovement";

/**
 * Represents a Launch
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "launches", schema: DefaultSchemas.FINANCIAL})
export class Launch extends PersistentEntity{
    
    @Column({name: "code", nullable: false, length: 6, unique: true})
    code: string;
    @Column({name: "quote_number"})
    quoteNumber: number;
    @ManyToOne(type => FinancialPeriod, {nullable: false})
    @JoinColumn({name: "id_financial_period"})
    financialPeriod: FinancialPeriod;
    @ManyToOne(type => FixedMovement, {nullable: false})
    @JoinColumn({name: "id_fixed_movement"})
    fixedMovement: FixedMovement;
    @OneToOne(type => PeriodMovement, {nullable: false})
    @JoinColumn({name: "id_period_movement"})
    periodMovement: PeriodMovement;
}