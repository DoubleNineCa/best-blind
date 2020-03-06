import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterCustomerInput {
    @Field()
    @Length(1, 255)
    name: string;

    @Field()
    address: string;

    @Field()
    phone: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    note: string;
}
