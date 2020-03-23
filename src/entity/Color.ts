import { Entity, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";

@ObjectType()
@Entity()
export class Color extends BaseEntityWithUuid {
    @Field()
    @Column({ unique: true })
    color: string;

}