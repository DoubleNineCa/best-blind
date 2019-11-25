import { Entity, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";

@ObjectType()
@Entity()
export class Fabric extends BaseEntityWithUuid {

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    color: string;

    @Field()
    @Column()
    manufacturer: string;

    @Field()
    @Column()
    grade: string;
}