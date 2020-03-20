import { getManager } from "typeorm";
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Item } from "../../../entity/Item";
import { ItemInput } from "../ItemInput";
import { Part, PartType } from "../../../entity/Part";
import { Order } from "../../../entity/Order";
import { Grade } from "../../../entity/Grade";
import { totalCal, roundCal, roundUp } from "../../../utils/totalCalculator";
import { isAuth } from "../../../utils/isAuth";

@Resolver()
export class CreateItemResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Item)
    async createItem(
        @Arg("orderId") orderId: number,
        @Arg("partId") partId: number,
        @Arg("data") { roomName, width, height, handrailType, handrailMaterial, handrailLength, coverColor }: ItemInput
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
        const areaMulti = width * height / 10000 > 1.5 ? width * height / 10000 : 1.5;

        const basePrice = part.type === PartType.FABRIC ? roundUp(areaMulti, 10) * grade.price : grade.price;
        let newItem = Item.create({
            partId,
            itemName: part.name + " " + part.color,
            width,
            height,
            price: basePrice,
            handrailType,
            handrailMaterial,
            handrailLength,
            coverColor,
            roomName
        })

        await getManager().transaction(async transactionalEntityManager => {
            if (order.items.length === 0) {
                order.items = new Array(newItem);
            } else {
                order!.items.push(newItem);
            }

            order.total = await totalCal(order.items, order.discount, order.installation, order.installationDiscount);
            newItem = await transactionalEntityManager.save(newItem);
            await transactionalEntityManager.save(order);

        });

        return newItem;
    }
}