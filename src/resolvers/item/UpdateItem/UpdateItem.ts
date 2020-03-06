import { getManager } from "typeorm";
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Order } from "../../../entity/Order";
import { Item } from "../../../entity/Item";
import { Part, PartType } from "../../../entity/Part";
import { Grade } from "../../../entity/Grade";
import { ItemInput } from "../ItemInput";
import { isAuth } from "../../../utils/isAuth";
import { totalCal, roundUp } from "../../../utils/totalCalculator";


@Resolver()
export class UpdateItemResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateItem(
        @Arg("itemId") itemId: number,
        @Arg("partId") partId: number,
        @Arg("data")
        { width, height, handrailType, handrailMaterial, handrailLength, coverColor, roomName }: ItemInput
    ): Promise<Boolean> {
        const item = await Item.findOne(itemId);
        const part = await Part.findOne(partId);

        if (!part || !item) {
            throw new Error("Something went wrong");
        }

        const grade = await Grade.findOne({ where: { name: part.grade } });

        if (!grade) {
            throw new Error("Price doesn't match");
        }

        const areaMulti = width * height / 10000;

        const basePrice = part.type === PartType.FABRIC ? (areaMulti < 1.5 ? 1.5 : roundUp(areaMulti, 10)) * grade.price : grade.price;
        return getManager().transaction(async transactionalEntityManager => {
            return transactionalEntityManager
                .update(
                    Item,
                    { id: itemId },
                    {
                        partId: partId === undefined ? item.partId : partId,
                        width: width === undefined ? item.width : width,
                        itemName: part.name + " " + part.color,
                        height: height === 0 ? item.height : height,
                        handrailType: handrailType === undefined ? item.handrailType : handrailType,
                        handrailMaterial: handrailMaterial === undefined ? item.handrailMaterial : handrailMaterial,
                        handrailLength: handrailLength === undefined ? item.handrailLength : handrailLength,
                        coverColor: coverColor === undefined ? item.coverColor : coverColor,
                        price: basePrice,
                        roomName: roomName === undefined ? item.roomName : roomName
                    }
                )
                .then(async () => {
                    const order = await Order.findOne(item.order, { relations: ["items"] });
                    if (!order) {
                        throw new Error("Something went wrong");
                    }
                    order.total = await totalCal(order.items, order.discount, order.installation, order.installationDiscount);

                    Order.save(order);

                    return true;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        });
    }
}