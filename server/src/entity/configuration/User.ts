import { PersistentEntity } from "../PersistentEntity";
import {Column, Entity, JoinColumn, OneToOne, ManyToOne, BeforeInsert} from "typeorm";
import {Profile} from "./Profile";
import { Group } from "./Group";
import { StoreType } from "./StoreType";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";
import * as bcrypt from 'bcrypt';

/**
 * User representation
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 30/05/2019
 */
@Entity({name: "users", schema: DefaultSchemas.CONFIGURATION})
export class User extends PersistentEntity {
    @Column({name: "nome", nullable: false, length: 90})
    name: string;
    @Column({name: "email", nullable: false, length: 90})
    email:string;
    @Column({name: "username", nullable: false, length: 20})
    username: string;
    @Column({name: "password", nullable: false})
    password: string;
    @Column({name: "active", nullable: false})
    active: boolean;

    @OneToOne(type => Profile, {nullable: false, cascade: true})
    @JoinColumn({name: "id_profile"})
    profile: Profile;
    @ManyToOne(type => Group, {nullable: false})
    @JoinColumn({name: "id_group"})
    group: Group;

    @Column({name: "store_type", nullable: false, enum: StoreType, default: StoreType.LOCAL})
    storeType: StoreType;

    passwordConfirmation:string

    @BeforeInsert()
    async beforeInsert(){
        this.created = new Date();
        this.password = await this.encryptPassword();
    }

    private encryptPassword(){
        return bcrypt.hash(this.password, 10).then((hashedPassword: string) => hashedPassword);
    }
}