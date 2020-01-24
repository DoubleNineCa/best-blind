import { Resolver, Query, UseMiddleware, Arg, Ctx } from "type-graphql";

import { Order } from "../../../entity/Order";
import { isAuth } from "../../../utils/isAuth";
import { Context } from "../../../types/Context"

@Resolver()
export class GetOrdersResolver {
    @UseMiddleware(isAuth)
    @Query(() => [Order])
    async getOrders(
        @Ctx() context: Context,
    ): Promise<Order[]> {
        console.log("orders : ", context.req.session)
        return Order.find({ relations: ["items", "customer"], order: { orderNo: "DESC" } });
    }
}
