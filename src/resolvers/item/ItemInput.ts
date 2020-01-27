import { Min, Max } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Material, CoverColor } from "../../entity/Item";

@InputType()
export class ItemInput {

    // @Field()
    // orderId: number;

    // @Field()
    // blindId: number;

    @Field({ nullable: true })
    width: number;

    @Field({ nullable: true })
    height: number;

    @Field({ nullable: true })
    handrailType: string;

    @Field({ nullable: true })
    handrailMaterial: Material;

    @Field()
    handrailLength: number;

    @Field()
    coverColor: CoverColor;

}
