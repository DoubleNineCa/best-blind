import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterCustomerInput {
    @Field()
    @Length(1, 255)
    name: string;

    @Field()
    address: string;

    @Field({ nullable: true })
    city: string;

    @Field({ nullable: true })
    province: string;

    @Field({ nullable: true })
    postal: string;

    @Field()
    phone: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    note: string;
}
