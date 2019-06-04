import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, OneToMany } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { Telephone } from "./Telephone";
import { ContactType } from "./ContactType";

/**
 * Represents a Contact
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "contact", schema: DefaultSchemas.REGISTRATION})
export class Contact extends PersistentEntity{
    
    @Column({name: "code", nullable: false, length: 6, unique: true})
    code: string;
    @Column({name: "name", nullable: false, length: 90})
    name: string;
    @Column({name: "document", nullable: true, length: 25})
    document: string;
    @Column({name: "birth_date", nullable: true})
    birthDate: Date;
    @Column({name: "other_information", nullable: true, type: "text"})
    otheInformation: string;
    @Column({name: "zipcode", nullable: true, length: 9})
    zipcode: string;
    @Column({name: "street", nullable: true, length: 90})
    street: string;
    @Column({name: "number", nullable: true, length: 8})
    number: string;
    @Column({name: "complement", nullable: true, length: 45})
    complement: string;
    @Column({name: "distict", nullable: true, length: 45})
    district: string;
    @Column({name: "province", length: 45, nullable: false})
    province: string;
    @Column({name: "city", length: 45, nullable: false})
    city: string;
    @Column({name: "email", nullable: true, length: 90})
    email: string;
    @Column({name: "active", nullable: false})
    active: boolean;
    @Column({name: "contact_type", nullable: false, enum: ContactType, type: "text"})
    contactType: ContactType;
    @OneToMany(type => Telephone, telephone => telephone.contact)
    telephones: Array<Telephone>;

    deletedTelephones: Array<Telephone>;

}