import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

import { PartType, PartKind } from "../../entity/Part";

@InputType()
export class PartInput {
    @Field(() => PartType)
    type: PartType;

    @Field(() => PartKind)
    kind: PartKind;

    @Field({ nullable: true })
    @Length(1, 255)
    name: string;

    @Field({ nullable: true })
    color: string;

    @Field({ nullable: true })
    manufacturer: string;

    @Field({ nullable: true })
    grade: string;

    @Field({ nullable: true })
    modelNo: string;

    @Field({ defaultValue: 0 })
    stocks: number;
}
