import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { PaymentMethod } from "./PaymentMethod";
import { Card } from "../registration/Card";
import { Wallet } from "../registration/Wallet";

/**
 * Represents a Payment
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "payments", schema: DefaultSchemas.FINANCIAL})
export class Payment extends PersistentEntity{

    @Column({name: "paid_on", nullable: false})
    paidOn: Date;
    @Column({name: "discount", nullable: true, type: "decimal", precision: 2})
    discount: number;
    @Column({name: "paid_value", nullable: false, type: "decimal", precision: 2})
    paidValue: number;
    @Column({name: "payment_method", nullable: false, enum: PaymentMethod, type: "text"})
    paymentMethod: PaymentMethod;
    @ManyToOne(type => Card)
    @JoinColumn({name: "id_card"})
    card: Card;
    @ManyToOne(type => Wallet)
    @JoinColumn({name: "id_wallet"})
    wallet: Wallet;
}