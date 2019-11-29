import { Entity, Column } from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";

export enum Type {
    FABRIC = "FABRIC",
    COMPONENT = "COMPONENT"
}

registerEnumType(Type, {
    name: "Type"
});

@ObjectType()
@Entity()
export class Part extends BaseEntityWithUuid {

    @Field()
    @Column()
    type: Type;

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
}