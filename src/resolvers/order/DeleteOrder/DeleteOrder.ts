import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Order } from "../../../entity/Order";
import { isAuth } from "../../../utils/isAuth";

@Resolver()
export class DeleteOrderResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deleteOrder(
        @Arg("orderNo") orderNo: number,
    ): Promise<Boolean> {
        const order = await Order.findOne({ where: { orderNo: orderNo }, relations: ["items"] });

        if (!order) {
            throw new Error("Something went wrong");
        }

        await Order.remove(order);

        return true;
    }
}