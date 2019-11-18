import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { Customer } from "../entity/Customer";
import { Item } from "./Item";

export enum Status {
    MEASURE = "MEASURE",
    MANUFACTURE = "MANUFACTURE",
    INSTALL = "INSTALL",
    RAMAINING = "RAMAINING",
    COMPLETE = "COMPLETE"
}

registerEnumType(Status, {
    name: "Status"
});

@ObjectType()
@Entity()
export class Order extends BaseEntityWithUuid {
    @Field()
    @Column()
    orderNo: string;

    @Field()
    @Column({ nullable: true })
    hst: boolean;

    @Field()
    @Column({ nullable: true })
    deposit: number;

    @Field()
    @Column({ nullable: true })
    installation: number;

    @Field()
    @Column({ nullable: true })
    total: number;

    @Field(() => [Item])
    @OneToMany(() => Item, item => item.order)
    items: Item[];

    @Field(() => Status)
    @Column({ default: Status.MEASURE })
    status: Status;

    @Field()
    @Column({ nullable: true })
    payment: string;

    @Field()
    @Column()
    orderDate: Date;

    @Field()
    @Column({ nullable: true })
    installDate: Date;

    @ManyToOne(() => Customer, customer => customer.orders)
    customer: Customer;
}
