import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Item, Material } from "../../../entity/Item";
import { CreateItemInput } from "./CreateItemInput";
import { Fabric } from "../../../entity/Fabric";
import { Order } from "../../../entity/Order";

@Resolver()
export class CreateItemResolver {
    @Mutation(() => Item)
    async createItem(
        @Arg("data") { orderId, blindId, width, height, handrailType }: CreateItemInput
    ): Promise<Item | undefined> {

        const order = await Order.findOne(orderId, { relations: ["items"] });
        const blind = await Fabric.findOne(blindId);

        if (!blind || !order) {
            throw new Error("Something went wrong");
        }

        const newItem = Item.create({
            blindId,
            width,
            height,
            handrailType
        })

        await getManager().transaction(async transactionalEntityManager => {
            if (order.items.length === 0) {
                order.items = new Array(newItem);
            } else {
                order!.items.push(newItem);
            }
            await transactionalEntityManager.save(newItem);
            await transactionalEntityManager.save(order);

        });

        return newItem;
    }
}