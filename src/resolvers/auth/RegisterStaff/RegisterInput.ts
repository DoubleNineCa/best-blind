import { Length, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
    @Field()
    @Length(1, 255)
    staffId: string;

    @Field()
    @MinLength(8)
    password: string;
}
