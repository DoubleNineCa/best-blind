import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Item } from "../../../entity/Item";
import { ItemInput } from "../ItemInput";

@Resolver()
export class UpdateItemResolver {
    @Mutation(() => Boolean)
    async updateItem(
        @Arg("itemId") itemId: number,
        @Arg("blindId") blindId: number,
        @Arg("data")
        { width, height, handrailType }: ItemInput
    ): Promise<Boolean> {
        const item = await Item.findOne(itemId);

        if (!item) {
            throw new Error("something went wrong");
        }

        return getManager().transaction(async transactionalEntityManager => {
            return transactionalEntityManager
                .update(
                    Item,
                    { id: itemId },
                    {
                        blindId: blindId === undefined ? item.blindId : blindId,
                        width: width === undefined ? item.width : width,
                        height: height === 0 ? item.height : height,
                        handrailType: handrailType === undefined ? item.handrailType : handrailType
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