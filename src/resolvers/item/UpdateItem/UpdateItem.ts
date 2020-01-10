import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Item } from "../../../entity/Item";
import { Part } from "../../../entity/Part";
import { ItemInput } from "../ItemInput";

@Resolver()
export class UpdateItemResolver {
    @Mutation(() => Boolean)
    async updateItem(
        @Arg("itemId") itemId: number,
        @Arg("partId") partId: number,
        @Arg("data")
        { width, height, handrailType, handrailMaterial, handrailLength, coverColor }: ItemInput
    ): Promise<Boolean> {
        const item = await Item.findOne(itemId);
        const part = await Part.findOne(partId);

        if (!part || !item) {
            throw new Error("Something went wrong");
        }

        return getManager().transaction(async transactionalEntityManager => {
            return transactionalEntityManager
                .update(
                    Item,
                    { id: itemId },
                    {
                        partId: partId === undefined ? item.partId : partId,
                        width: width === undefined ? item.width : width,
                        itemName: part.name,
                        height: height === 0 ? item.height : height,
                        handrailType: handrailType === undefined ? item.handrailType : handrailType,
                        handrailMaterial: handrailMaterial === undefined ? item.handrailMaterial : handrailMaterial,
                        handrailLength: handrailLength === undefined ? item.handrailLength : handrailLength,
                        coverColor: coverColor === undefined ? item.coverColor : coverColor
                    }
                )
                .then(() => {
                    return true;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        });
    }
}