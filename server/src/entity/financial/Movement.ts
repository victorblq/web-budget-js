import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import { Apportionment } from "./Apportionment";
import { Contact } from "../registration/Contact";

/**
 * Represents a Movement
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 03/06/2019
 */
@Entity({name: "movements", schema: DefaultSchemas.FINANCIAL})
export class Movement extends PersistentEntity{

    @Column({name: "code", nullable: false, length: 6, unique: true})
    code: string;
    @Column({name: "identification", nullable: false, length: 90})
    identification: string;
    @Column({name: "description", nullable: true, type: "text"})
    description: string;
    @Column({name: "value", nullable: false, type: "decimal", precision: 2})    
    value: number;
    @ManyToOne(type => Contact)
    @JoinColumn({name: "id_contact"})
    contact: Contact;
    @OneToMany(type => Apportionment, apportionment => apportionment.movement)
    apportionments: Array<Apportionment>;

    deletedApportioments: Array<Apportionment>;
}