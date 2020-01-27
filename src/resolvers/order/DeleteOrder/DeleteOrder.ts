import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Order } from "../../../entity/Order";
import { isAuth } from "../../../utils/isAuth";

@Resolver()
export class DeleteOrderResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deleteOrder(
        @Arg("id") id: number,
    ): Promise<Boolean> {
        const order = await Order.findOne(id, { relations: ["items"] });

        if (!order) {
            throw new Error("Something went wrong");
        }

        await Order.delete(id);

        return true;
    }
}