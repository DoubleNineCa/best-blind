import { Min, Max } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Material } from "../../../entity/Item";

@InputType()
export class CreateItemInput {

    @Field()
    orderId: number;

    @Field()
    blindId: number;

    @Field()
    width: number;

    @Field()
    height: number;

    @Field({ defaultValue: "R" })
    handrailType: string;

    // @Field({defaultValue: "METAL"})
    // handrailMaterial: Material;

}
