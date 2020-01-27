import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class GradeInput {
    @Field()
    @Length(1, 255)
    name: string;

    @Field()
    price: number;
}
