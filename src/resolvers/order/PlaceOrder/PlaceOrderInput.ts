import { Length, IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

import { Status } from "../../../entity/Order";

@InputType()
export class PlaceOrderInput {
    @Field()
    @Length(1, 8)
    orderNo: string;

    @Field({ nullable: true })
    hst?: boolean;

    @Field({ nullable: true })
    deposit?: number;

    @Field({ nullable: true })
    installation?: number;

    @Field({ nullable: true })
    status?: Status;

    @Field({ nullable: true })
    payment?: string;

}
