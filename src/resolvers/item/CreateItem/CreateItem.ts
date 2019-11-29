import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Item, Material } from "../../../entity/Item";
import { ItemInput } from "../ItemInput";
import { Fabric } from "../../../entity/Fabric";
import { Order } from "../../../entity/Order";
import { Grade } from "../../../entity/Grade";

@Resolver()
export class CreateItemResolver {
    @Mutation(() => Item)
    async createItem(
        @Arg("orderId") orderId: number,
        @Arg("blindId") blindId: number,
        @Arg("data") { width, height, handrailType, handrailMaterial }: ItemInput
    ): Promise<Item | undefined> {

        const order = await Order.findOne(orderId, { relations: ["items"] });
        const blind = await Fabric.findOne(blindId);

        if (!blind || !order) {
            throw new Error("Something went wrong");
        }

        const grade = await Grade.findOne({ where: { name: blind.grade } });

        if (!grade) {
            throw new Error("Price doesn't match");
        }

        const unitPrice = grade.price;
        const basePrice = width * height / 10000 * unitPrice;

        let newItem = Item.create({
            blindId,
            itemName: blind.name,
            width,
            height,
            price: basePrice + (handrailMaterial === Material.MOTOR ? 300 : 0),
            handrailType,
            handrailMaterial
        })

        await getManager().transaction(async transactionalEntityManager => {
            if (order.items.length === 0) {
                order.items = new Array(newItem);
            } else {
                order!.items.push(newItem);
            }
            newItem = await transactionalEntityManager.save(newItem);
            await transactionalEntityManager.save(order);

        });

        return newItem;
    }
}