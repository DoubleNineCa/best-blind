import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCustomerInput {
    @Field({ nullable: true })
    @Length(1, 255)
    name: string;

    @Field({ nullable: true })
    address: string;

    @Field({ nullable: true })
    phone: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    note: string;
}
