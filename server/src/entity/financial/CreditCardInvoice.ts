import { PersistentEntity } from "../PersistentEntity";
import { Entity, ManyToOne, JoinColumn, Column, OneToOne, OneToMany } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { FinancialPeriod } from "../registration/FinancialPeriod";
import { InvoiceState } from "./InvoiceState";
import { PeriodMovement } from "./PeriodMovement";
import { Card } from "../registration/Card";

/**
 * Represents a CreditCardInvoice
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "credit_card_invoices", schema: DefaultSchemas.FINANCIAL})
export class CreditCardInvoice extends PersistentEntity{

    @ManyToOne(type => FinancialPeriod)
    @JoinColumn({name: "id_financial_period"})
    financialPeriod: FinancialPeriod;
    @Column({name: "identification", nullable: false, length: 90, unique: true})
    identification: string;
    @Column({name: "total_value", nullable: true, type: "decimal", precision: 2})
    totalValue: number;
    @Column({name: "due_data", nullable: false})
    dueDate: Date;
    @Column({name: "closing_date", nullable: true})
    closingDate: Date;
    @Column({name: "payment_date", nullable: true})
    paymentDate: Date;
    @Column({name: "invoice_state", nullable: false, enum: InvoiceState, type: "text"})
    invoiceState: InvoiceState;
    @OneToOne(type => PeriodMovement)
    @JoinColumn({name: "id_period_movement"})
    periodMovement: PeriodMovement;
    @ManyToOne(type => Card)
    @JoinColumn({name: "id_card"})
    card: Card;
    @OneToMany(type => PeriodMovement, periodMovement => periodMovement.creditCardInvoice)
    periodMovements: Array<PeriodMovement>;
}