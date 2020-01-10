import { Entity, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";
import { Order } from "../entity/Order";

export enum Material {
    BASIC = "BASIC",
    CRYSTAL = "CRYSTAL",
    METAL = "METAL",
    MOTOR = "MOTOR"
}

export enum CoverColor {
    WHITE = "WHITE",
    IVORY = "IVORY",
    GREY = "GREY",
    BLACK = "BLACK",
    BROWN = "BROWN"
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

    @Field()
    @Column("float")
    handrailLength: number;

    @Field()
    @Column()
    coverColor: CoverColor;

    @ManyToOne(() => Order, order => order.items, { onDelete: "CASCADE" })
    order: Order;
}