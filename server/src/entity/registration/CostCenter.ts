import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";

/**
 * Represents a Cost Center
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "cost_centers", schema: DefaultSchemas.REGISTRATION})
export class CostCenter extends PersistentEntity{

    @Column({name: "name", nullable: false, length: 90})
    name: string;
    @Column({name: "color", nullable: false, length: 21})
    color: string;
    @Column({name: "expenses_budget", nullable: false, type: "decimal", precision: 2})
    expensesBudget: number;
    @Column({name: "revenues_budget", nullable: false, type: "decimal", precision: 2})
    revenuesBudget: number;
    @Column({name: "description", nullable: true, type: "text"})
    description: string;
    @Column({name: "active", nullable: false})
    active: boolean;
    @ManyToOne(type => CostCenter, costCenter => costCenter.parent)
    @JoinColumn({name: "id_parent"})
    parent: CostCenter;
    
    percentage: number;
    totalMovements: number;
}