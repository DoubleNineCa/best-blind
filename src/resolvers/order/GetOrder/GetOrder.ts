import { Resolver, Query, UseMiddleware, Arg } from "type-graphql";

import { Order } from "../../../entity/Order";

@Resolver()
export class GetOrderResolver {
    @Query(() => Order)
    async getOrder(
        @Arg("orderNo") orderNo: string
    ): Promise<Order | undefined> {
        return await Order.findOne({ where: { orderNo: orderNo }, relations: ["items"] });
    }
}
