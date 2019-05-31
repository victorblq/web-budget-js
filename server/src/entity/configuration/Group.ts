import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Grant } from "./Grant";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";

/**
 * This class represents a group of {@link Authorization} for a collection of {@link User}
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 30/05/2019
 */
@Entity({name: "groups", schema: DefaultSchemas.CONFIGURATION})
export class Group extends PersistentEntity {

    @Column({name: "name", nullable: false, length: 45})
    name: string;
    @Column({name: "active", nullable: false, default: true})
    active: boolean;

    @ManyToOne(type => Group)
    @JoinColumn({name: "id_parent"})
    parent: Group;

    @OneToMany(type => Grant, grant => grant.group, {eager: true, onDelete: "CASCADE"})
    grants: Array<Grant>;
}