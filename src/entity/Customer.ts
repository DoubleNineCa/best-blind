import {
    Entity,
    Column,
    OneToMany
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { Order } from "../entity/Order";

export enum Type {
    INDIVIDUAL = "INDIVIDUAL",
    BUSINESS = "BUSINESS"
}

@ObjectType()
@Entity()
export class Customer extends BaseEntityWithUuid {
    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    address: string;

    @Field()
    @Column()
    phone: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Field(() => [Order])
    @OneToMany(() => Order, order => order.customer)
    orders: Order[];

    @Field()
    @Column({ default: Type.INDIVIDUAL })
    type: Type;

    @Field()
    @Column({ nullable: true })
    note: string;
}