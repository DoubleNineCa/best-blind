import { Entity, Column } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";

export enum PartType {
    FABRIC = "FABRIC",
    COMPONENT = "COMPONENT"
}

export enum PartKind {
    COMBI = "COMBI",
    ROLL = "ROLL",
    TRIPLE = "TRIPLE"
}

registerEnumType(PartType, {
    name: "PartType"
});

registerEnumType(PartKind, {
    name: "PartKind"
})

@ObjectType()
@Entity()
export class Part extends BaseEntityWithUuid {

    @Field(() => PartType)
    @Column()
    type: PartType;

    @Field((() => PartKind))
    @Column()
    kind: PartKind;

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