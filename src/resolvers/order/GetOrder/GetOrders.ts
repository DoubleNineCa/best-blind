import { Resolver, Query, UseMiddleware, Arg } from "type-graphql";

import { Order } from "../../../entity/Order";

@Resolver()
export class GetOrdersResolver {
    @Query(() => [Order])
    async getOrders(): Promise<Order[]> {
        return Order.find({ relations: ["items"] });
    }
}
