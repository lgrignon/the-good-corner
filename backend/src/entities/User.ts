import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    role: string;

    @Column()
    passwordHashed: string;

    constructor(
        email: string = '',
        role: string = '',
        passwordHashed: string = '',
    ) {
        super();
        this.email = email;
        this.role = role;
        this.passwordHashed = passwordHashed;
    }
}