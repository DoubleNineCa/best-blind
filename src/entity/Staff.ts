import { ObjectType, Field } from "type-graphql";
import { Entity, Column } from "typeorm";
import { BaseEntityWithUuid } from "../utils/BaseEntityWithUuid";


@ObjectType()
@Entity()
export class Staff extends BaseEntityWithUuid {

    @Field()
    @Column({ unique: true })
    staffId: string

    @Field()
    @Column()
    password: string

}