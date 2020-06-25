import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { Customer } from "../entity/Customer";
import { Item } from "./Item";

export enum Status {
    MEASURE = "MEASURE",
    MANUFACTURE = "MANUFACTURE",
    INSTALL = "INSTALL",
    REMAINING = "REMAINING",
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
    @Column({ default: true })
    hst: boolean;

    @Field()
    @Column({ nullable: true })
    deposit: number;

    @Field()
    @Column({ default: 0 })
    discount: number;

    @Field()
    @Column({ nullable: true })
    installation: number;

    @Field()
    @Column("float", { default: 0 })
    installationDiscount: number;

    @Field({ nullable: true })
    @Column("float", { default: 0 })
    total: number;

    @Field(() => [Item], { nullable: true })
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

    @Field({ nullable: true })
    @Column({ nullable: true })
    installDate: Date;

    @Field(() => Customer)
    @ManyToOne(() => Customer, customer => customer.orders, { onDelete: "CASCADE" })
    customer: Customer;

    @Field({ nullable: true })
    @Column({ nullable: true })
    invoiceDate: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    invAddress: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    invCity: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    invProvince: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    invPostal: string;

    @Field()
    @Column({ default: "" })
    midPayment: string;

    @Field()
    @Column({ default: "" })
    finalPayment: string;

    @Field({ nullable: true })
    @Column({ default: "" })
    installAddress: string;
}
