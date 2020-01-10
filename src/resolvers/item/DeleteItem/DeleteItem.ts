import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Item } from "../../../entity/Item";

@Resolver()
export class DeleteItemResolver {
    @Mutation(() => Boolean)
    async deleteItem(
        @Arg("itemId") itemId: number,
    ): Promise<Boolean> {
        const item = await Item.findOne(itemId);

        if (!item) {
            throw new Error("Something went wrong");
        }

        await Item.delete(itemId)

        return true;
    }
}