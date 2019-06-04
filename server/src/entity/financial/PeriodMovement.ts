import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { CreditCardInvoice } from "./CreditCardInvoice";
import { FinancialPeriod } from "../registration/FinancialPeriod";
import { PeriodMovementState } from "./PeriodMovementState";
import { PeriodMovementType } from "./PeriodMovementType";
import { Payment } from "./Payment";

/**
 * Represents a PeriodMovement
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "period_movement", schema: DefaultSchemas.FINANCIAL})
export class PeriodMovement extends PersistentEntity{

    @Column({name: "due_date", nullable: true})
    dueDate: Date;
    @Column({name: "period_movement_state", enum: PeriodMovementState, type: "text"})
    periodMovementState: PeriodMovementState;
    @Column({name: "period_movement_type", enum: PeriodMovementType, type: "text"})
    periodMovementType: PeriodMovementType;
    @OneToOne(type => Payment, {onDelete: "CASCADE"})
    @JoinColumn({name: "id_payment"})
    payment: Payment;
    @ManyToOne(type => CreditCardInvoice, creditCardInvoice => creditCardInvoice.periodMovement)
    @JoinColumn({name: "id_credit_card_invoice"})
    creditCardInvoice: CreditCardInvoice;
    @ManyToOne(type => FinancialPeriod, {nullable: false})
    @JoinColumn({name: "id_financial_period"})
    financialPeriod: FinancialPeriod;

    checked: boolean;
}