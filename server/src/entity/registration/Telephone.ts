import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { Contact } from "./Contact";
import { NumberType } from "./NumberType";

/**
 * Represents a Telephone
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "telephones", schema: DefaultSchemas.REGISTRATION})
export class Telephone extends PersistentEntity{

    @Column({name: "number", nullable: false, length: 20})
    number: string;
    @Column({name: "number_type", nullable: false, enum: NumberType, type: "text"})
    numberType: NumberType;
    @ManyToOne(type => Contact, contact => contact.telephones)
    @JoinColumn({name: "id_contact"})
    contact: Contact;
}