import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    constructor(
        name: string = '',
    ) {
        this.name = name;
    }
}