import {
    Entity,
    Column,
    OneToMany
} from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { Order } from "../entity/Order";

export enum TempType {
    TEMPA = "TEMPA",
    TEMPB = "TEMPB"
}

registerEnumType(TempType, {
    name: "TempType"
});

@ObjectType()
@Entity()
export class Temp extends BaseEntityWithUuid {
    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    address: string;
}