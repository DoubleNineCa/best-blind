import { Entity, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { Order } from "../entity/Order";

export enum Material {
    ROPE = "ROPE",
    BEADS = "BEADS",
    METAL = "METAL"
}

registerEnumType(Material, {
    name: "Material"
});

@ObjectType()
@Entity()
export class Item extends BaseEntityWithUuid {

    @Field()
    @Column()
    width: number;

    @Field()
    @Column()
    height: number;

    @Field(() => Material)
    @Column({ default: Material.METAL })
    handrailMaterial: Material;

    @Field()
    @Column({ default: "R" })
    handrailType: string;

    @ManyToOne(() => Order, order => order.items)
    order: Order;
}