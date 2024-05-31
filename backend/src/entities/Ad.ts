import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    owner: string;

    @Column({ nullable: true })
    price?: number;

    @Column({ nullable: true })
    picture?: string;

    @Column({ nullable: true })
    location?: string;

    @Column({ nullable: true })
    createdAt?: Date;

    @ManyToOne(() => Category, category => category.ads, { eager: true })
    category?: Category;

    @ManyToMany(() => Tag, { cascade: true })
    @JoinTable()
    tags?: Promise<Tag[]>;

    constructor(
        title: string = '',
        description: string | undefined = undefined,
        owner: string = '',
        price?: number,
        picture?: string,
        location?: string,
        createdAt?: Date,
    ) {
        this.title = title;
        this.description = description;
        this.owner = owner;
        this.price = price;
        this.picture = picture;
        this.location = location;
        this.createdAt = createdAt;
    }
}