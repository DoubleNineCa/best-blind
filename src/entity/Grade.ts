import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { Fabric } from "../entity/Fabric";

@ObjectType()
@Entity()
export class Grade extends BaseEntityWithUuid {
    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    price: number;

    @Field(() => [Fabric])
    @OneToMany(() => Fabric, fabric => fabric.grade)
    fabrics: Fabric[];
}