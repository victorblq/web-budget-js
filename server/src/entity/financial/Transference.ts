import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { Wallet } from "../registration/Wallet";

/**
 * Represents a Transference
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "tranfers", schema: DefaultSchemas.FINANCIAL})
export class Transference extends PersistentEntity{
    
    @Column({name: "value", type: "decimal", nullable: false, precision: 2})
    value: number;
    @Column({name: "transfer_date", nullable: false})
    transferDate: Date;
    @Column({name: "descrption", type: "text", nullable: true})
    description: string;
    @ManyToOne(type => Wallet)
    @JoinColumn({name: "id_origin"})
    origin: Wallet;
    @ManyToOne(type => Wallet)
    @JoinColumn({name: "id_destination"})
    destination: Wallet;
}