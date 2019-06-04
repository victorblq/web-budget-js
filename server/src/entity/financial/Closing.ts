import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { FinancialPeriod } from "../registration/FinancialPeriod";

/**
 * Represents a Closing
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "closings", schema: DefaultSchemas.FINANCIAL})
export class Closing extends PersistentEntity{

    @Column({name: "revenues", nullable: false, type: "decimal", precision: 2})
    revenues: number;
    @Column({name: "expenses", nullable: false, type: "decimal", precision: 2})
    expenses: number;
    @Column({name: "credit_card_expenses", nullable: false, type: "decimal", precision: 2})
    creditCardExpenses: number;
    @Column({name: "debit_card_expenses", nullable: false, type: "decimal", precision: 2})
    debitCardExpenses: number;
    @Column({name: "cash_expenses", nullable: false, type: "decimal", precision: 2})
    cashExpenses: number;
    @Column({name: "balance", nullable: false, type: "decimal", precision: 2})
    balance: number;
    @Column({name: "accumulated", nullable: false, type: "decimal", precision: 2})
    accumulated: number;
    @Column({name: "closing_date", nullable: false})
    closingDate: Date;
    @OneToOne(type => FinancialPeriod, financialPeriod => financialPeriod.closing, {nullable: false})
    @JoinColumn({name: "id_financial_period"})
    financialPeriod: FinancialPeriod;
}