import {
    Entity,
    Column,
    OneToMany
} from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { Order } from "../entity/Order";

export enum CustomerType {
    INDIVIDUAL = "INDIVIDUAL",
    BUSINESS = "BUSINESS"
}

registerEnumType(CustomerType, {
    name: "CustomerType"
});

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
    @Column({ default: CustomerType.INDIVIDUAL })
    type: CustomerType;

    @Field()
    @Column({ nullable: true })
    note: string;
}