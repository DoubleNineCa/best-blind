import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import * as uuid from "uuid/v4";

const isTestEnv = process.env.NODE_ENV === "test";
@ObjectType()
@Entity()
export class BaseEntityWithUuid extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    uuid: string;

    @CreateDateColumn({
        type: isTestEnv ? "datetime" : "timestamp",
        default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'EST'"
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: isTestEnv ? "datetime" : "timestamp",
        default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'EST'"
    })
    updatedAt: Date;

    @BeforeInsert()
    private beforeInsert() {
        this.uuid = uuid();
    }
}
