import { Resolver, Query, UseMiddleware, Arg } from "type-graphql";

import { Order } from "../../../entity/Order";
import { Raw, MoreThan } from "typeorm";

@Resolver()
export class GetOrderResolver {
    @Query(() => Order)
    async getOrder(
        @Arg("orderNo") orderNo: string
    ): Promise<Order | undefined> {
        if (orderNo === "last") {
            const orders = await Order.find({
                order: { orderNo: "DESC" },
                take: 1,
                relations: ["items", "customer"]
            });
            return orders[0];
        }
        return await Order.findOne({ where: { orderNo: orderNo }, relations: ["items", "customer"] });
    }
}
