import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { FixedMovementState } from "./FixedMovementState";

/**
 * Represents a FixedMovement
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "fixed_movements", schema: DefaultSchemas.FINANCIAL})
export class FixedMovement extends PersistentEntity{

    @Column({name: "total_quotes", nullable: true})
    totalQuotes: number;
    @Column({name: "starting_quote", nullable: true})
    startingQuote: number;
    @Column({name: "auto_launch", nullable: false})
    autoLaunch: boolean;
    @Column({name: "undetermined", nullable: false})
    undetermined: boolean;
    @Column({name: "start_date", nullable: true})
    startDate: Date;
    @Column({name: "fixed_movement_state", nullable: true, enum: FixedMovementState})
    fixedMovementState: FixedMovementState;

    alreadyLaunched: boolean;
}