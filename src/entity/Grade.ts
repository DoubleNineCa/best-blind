import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";

@ObjectType()
@Entity()
export class Grade extends BaseEntityWithUuid {
    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    price: number;

}