import { PersistentEntity } from "../PersistentEntity";
import { Entity, Column } from "typeorm";
import { DefaultSchemas } from "../../infrastructure/DefaultSchemas";

/**
 * This class represents a authorization for a single functionality, this is also commonly part of a {@link Grant} for
 * a {@link Group} that have {@link User} linked to
 *
 * @author Victor Carvalho
 *
 * @version 1.0.0
 * @since 1.0.0, 30/05/2019
 */
@Entity({name: "authorizations", schema: DefaultSchemas.CONFIGURATION})
export class Authorization extends PersistentEntity{
    @Column({name: "functionality", nullable: false, length: 90})
    functionality: string;
    @Column({name: "permission", nullable: false, length: 90})
    permission: string;

    /**
     * 
     */
    getFullPermission(): string {
        return `${this.functionality}:${this.permission}`;
    }

    /**
     * 
     * @param functionality 
     */
    isFunctionality(functionality: string): boolean {
        return functionality != null && this.functionality === functionality;
    }

    /**
     * 
     * @param permission 
     */
    isPermission(permission: string): boolean {
        return permission != null && 
            (this.permission === permission || this.getFullPermission() === permission);
    }
}