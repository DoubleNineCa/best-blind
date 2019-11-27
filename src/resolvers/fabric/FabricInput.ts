import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class FabricInput {
    @Field({ nullable: true })
    @Length(1, 255)
    name: string;

    @Field({ nullable: true })
    color: string;

    @Field({ nullable: true })
    manufacturer: string;

    @Field({ nullable: true })
    grade: string;
}
