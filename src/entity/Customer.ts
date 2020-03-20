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
    @Column({ unique: true })
    name: string;

    @Field()
    @Column()
    address: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    city: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    province: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    postal: string;

    @Field()
    @Column()
    phone: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    email: string;

    @Field(() => [Order])
    @OneToMany(() => Order, order => order.customer)
    orders: Order[];

    @Field()
    @Column({ default: CustomerType.INDIVIDUAL })
    type: CustomerType;

    @Field({ nullable: true })
    @Column({ nullable: true })
    note: string;
}