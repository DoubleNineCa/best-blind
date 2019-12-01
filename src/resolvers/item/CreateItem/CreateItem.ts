import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Item, Material } from "../../../entity/Item";
import { ItemInput } from "../ItemInput";
import { Part, Type } from "../../../entity/Part";
import { Order } from "../../../entity/Order";
import { Grade } from "../../../entity/Grade";

@Resolver()
export class CreateItemResolver {
    @Mutation(() => Item)
    async createItem(
        @Arg("orderId") orderId: number,
        @Arg("partId") partId: number,
        @Arg("data") { width, height, handrailType, handrailMaterial }: ItemInput
    ): Promise<Item | undefined> {

        const order = await Order.findOne(orderId, { relations: ["items"] });
        const part = await Part.findOne(partId);

        if (!part || !order) {
            throw new Error("Something went wrong");
        }

        const grade = await Grade.findOne({ where: { name: part.grade } });

        if (!grade) {
            throw new Error("Price doesn't match");
        }
        // basically, 1.5 width * height / 10000 is the minimum
        // installation fee should be given at least 2 inputs one for regular the other is for discount separately.
        // extra items won't be adjusted any discount from the top
        const areaMulti = width * height / 10000;

        const basePrice = part.type === Type.FABRIC ? (areaMulti < 1.5 ? 1.5 : Math.round(areaMulti * 10) / 10) * grade.price : grade.price;

        let newItem = Item.create({
            partId,
            itemName: part.name,
            width,
            height,
            price: basePrice,
            handrailType,
            handrailMaterial
        })

        await getManager().transaction(async transactionalEntityManager => {
            if (order.items.length === 0) {
                order.items = new Array(newItem);
            } else {
                order!.items.push(newItem);
            }

            order.total = order.items.reduce((accumulator, item) => {
                return accumulator + item.price * (100 - order.discount) / 100;
            }, 0);

            order.total = order.total + order.installation - order.deposit - order.installationDiscount;

            newItem = await transactionalEntityManager.save(newItem);
            await transactionalEntityManager.save(order);

        });

        return newItem;
    }
}