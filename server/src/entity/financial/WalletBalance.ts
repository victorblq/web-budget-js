import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { Wallet } from "../registration/Wallet";
import { BalanceType } from "./BalanceType";
import { ReasonType } from "./ReasonType";

/**
 * Represents a Wallet balance
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "wallet_balances", schema: DefaultSchemas.FINANCIAL})
export class WalletBalance extends PersistentEntity{
    
    @Column({name: "actual_balance", nullable: false, type: "decimal", precision: 2})
    actualBalance: number;
    @Column({name: "old_balance", nullable: false, type: "decimal", precision: 2})
    oldBalance: number;
    @Column({name: "transaction_value", nullable: false, type: "decimal", precision: 2})
    transactionValue: number;
    @Column({name: "movement_code", nullable: true})
    movementCode: string;
    @Column({name: "observations", type: "text", nullable: true})
    observations: string;
    @Column({name: "movement_date_time", nullable: false})
    movementDateTime: Date;
    @Column({name: "balance_type", nullable: false, enum: BalanceType, type: "text"})
    balanceType: BalanceType;
    @Column({name: "reason_type", nullable: false, enum: ReasonType, type: "text"})
    reasonType: ReasonType;
    @ManyToOne(type => Wallet, {nullable: false})
    @JoinColumn({name: "id_wallet"})
    wallet: Wallet;
}