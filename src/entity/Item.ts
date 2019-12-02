import { Entity, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { Order } from "../entity/Order";

export enum Material {
    ROPE = "ROPE",
    BEADS = "BEADS",
    METAL = "METAL",
    MOTOR = "MOTOR"
}

registerEnumType(Material, {
    name: "Material"
});

@ObjectType()
@Entity()
export class Item extends BaseEntityWithUuid {

    @Field()
    @Column()
    partId: number;

    @Field()
    @Column()
    itemName: string;

    @Field()
    @Column("float", { nullable: true })
    width: number;

    @Field()
    @Column("float", { nullable: true })
    height: number;

    @Field()
    @Column("float", { default: 0 })
    price: number;

    @Field(() => Material)
    @Column({ default: Material.METAL, nullable: true })
    handrailMaterial: Material;

    @Field()
    @Column({ default: "R" })
    handrailType: string;

    @ManyToOne(() => Order, order => order.items)
    order: Order;
}