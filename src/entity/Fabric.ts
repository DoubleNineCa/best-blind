import { Entity, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { Grade } from "../entity/Grade";

@ObjectType()
@Entity()
export class Fabric extends BaseEntityWithUuid {

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    manufacturer: string;

    @ManyToOne(() => Grade, grade => grade.fabrics)
    grade: Grade;
}