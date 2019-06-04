import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, OneToOne } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { Closing } from "../financial/Closing";

/**
 * Represents a Financial Period
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "financial_periods", schema: DefaultSchemas.REGISTRATION})
export class FinancialPeriod extends PersistentEntity{

    @Column({name: "identification", nullable: false})
    identification: string;
    @Column({name: "credit_card_goal", nullable: true, type: "decimal", precision: 2})
    creditCardGoal: number;
    @Column({name: "expenses_goal", nullable: true, type: "decimal", precision: 2})
    expensesGoal: number;
    @Column({name: "revenues_goal", nullable: true, type: "decimal", precision: 2})
    revenuesGoal: number;
    @Column({name: "start_date", nullable: false})
    startDate: Date;
    @Column({name: "end_date", nullable: false})
    endDate: Date;
    @Column({name: "expired", nullable: false})
    expired: boolean;
    @OneToOne(type => Closing, closing => closing.financialPeriod, {nullable: false})
    closing: Closing;
}