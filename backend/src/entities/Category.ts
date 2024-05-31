import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./Ad";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @OneToMany(() => Ad, ad => ad.category)
    ads?: Promise<Ad[]>

    constructor(
        name: string = '',
    ) {
        this.name = name;
    }
}