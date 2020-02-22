import { Resolver, Query, UseMiddleware, Arg, Ctx } from "type-graphql";
import { getRepository } from "typeorm";

import { Order } from "../../../entity/Order";
import { isAuth } from "../../../utils/isAuth";

@Resolver()
export class GetOrderResolver {
    @UseMiddleware(isAuth)
    @Query(() => Order, { nullable: true })
    async getOrder(
        @Arg("orderNo") orderNo: string
    ): Promise<Order | null> {
        if (orderNo === "last") {
            const orders = await Order.find({
                order: { orderNo: "DESC" },
                take: 1,
                relations: ["items", "customer"]
            });
            return orders ? orders[0] : null;
        }

        const orders = await getRepository(Order)
            .createQueryBuilder("order")
            .leftJoinAndSelect(
                "order.customer",
                "customer"
            )
            .leftJoinAndSelect(
                "order.items",
                "item"
            )
            .where("order.orderNo = :orderNo", { orderNo: orderNo })
            .orderBy("item.id", "ASC")
            .getMany();

        return orders ? orders[0] : null;
    }
}
