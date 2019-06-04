import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { WalletType } from "./WalletType";

/**
 * Represents a Wallet
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "wallets", schema: DefaultSchemas.REGISTRATION})
export class Wallet extends PersistentEntity{

    @Column({name: "name", nullable: false, length: 45})
    name: string;
    @Column({name: "bank", nullable: true, length: 45})
    bank: string;
    @Column({name: "agency", nullable: true, length: 10})
    agency: string;
    @Column({name: "account", nullable: true, length: 45})
    account: string;
    @Column({name: "digit", nullable: true, length: 4})
    digit: string;
    @Column({name: "description", nullable: true})
    description: string;
    @Column({name: "actualBalance", nullable: false, type: "decimal", precision: 2})
    actualBalance: number;
    @Column({name: "active", nullable: false})
    active: boolean;
    @Column({name: "wallet_type", nullable: false, enum: WalletType, type: "text"})
    walletType: WalletType;
}