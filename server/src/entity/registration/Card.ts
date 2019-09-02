import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { CardType } from "./CardType";
import { Wallet } from "./Wallet";

/**
 * Represents a Card
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "cards", schema: DefaultSchemas.REGISTRATION})
export class Card extends PersistentEntity{

    @Column({name: "name", nullable: false, length: 45})
    name: string;
    @Column({name: "number", nullable: false, length: 45})
    number: string;
    @Column({name: "flag", nullable: false, length: 45})
    flag: string;
    @Column({name: "credit_limit", nullable: true, type: "decimal"})
    creditLimit: number;
    @Column({name: "expiration_day", nullable: true})
    expirationDay: number;
    @Column({name: "owner", nullable: false, length: 45})
    owner: string;
    @Column({name: "active", nullable: false})
    active: boolean;
    @Column({name: "card_type", nullable: false, enum: CardType, type: "text"})
    cardType: CardType;
    @ManyToOne(type => Wallet, {nullable: true})
    @JoinColumn({name: "id_wallet"})
    wallet: Wallet;
}