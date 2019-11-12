import {
    Entity,
    Column
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";

// export enum Type {
//     INDIVIDUAL = "INDIVIDUAL",
//     BUSINESS = "BUSINESS"
// }

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

    // @Field()
    // @Column({ default: Type.INDIVIDUAL })
    // type: Type;

    @Field()
    @Column({ nullable: true })
    note: string;
}