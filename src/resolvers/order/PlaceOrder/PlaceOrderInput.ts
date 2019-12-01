import { Length, IsEmail, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

import { Status } from "../../../entity/Order";

@InputType()
export class PlaceOrderInput {
    @Field()
    customerId: number;

    @Field()
    @Length(1, 8)
    orderNo: string;

    @Field({ nullable: true })
    hst?: boolean;

    @Field({ nullable: true })
    deposit?: number;

    @Field({ nullable: true })
    discount?: number;

    @Field({ defaultValue: 0 })
    installation: number;

    @Field({ defaultValue: 0 })
    installationDiscount: number;

    @Field({ nullable: true })
    status?: Status;

    @Field({ nullable: true })
    payment?: string;

}
