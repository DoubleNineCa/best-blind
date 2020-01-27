import { Entity, Column } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";

export enum Type {
    FABRIC = "FABRIC",
    COMPONENT = "COMPONENT"
}

export enum Kind {
    COMBI = "COMBI",
    ROLL = "ROLL",
    TRIPLE = "TRIPLE"
}

registerEnumType(Type, {
    name: "Type"
});

registerEnumType(Kind, {
    name: "Kind"
})

@ObjectType()
@Entity()
export class Part extends BaseEntityWithUuid {

    @Field()
    @Column()
    type: Type;

    @Field()
    @Column({ nullable: true })
    kind: Kind;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    color: string;

    @Field()
    @Column()
    manufacturer: string;

    @Field()
    @Column()
    grade: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    modelNo: string;

    @Field()
    @Column({ default: 0 })
    stocks: number;
}