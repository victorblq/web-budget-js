import { PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";

export class AbstractEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    created: Date;

    @Column({nullable: true})
    updated: Date;

    @BeforeInsert()
    beforeInsert(){
        this.created = new Date();
    }

    @BeforeUpdate()
    beforeUpdate(){
        this.updated = new Date();
    }
}