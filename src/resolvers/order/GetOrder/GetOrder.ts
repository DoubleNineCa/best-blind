import { Resolver, Query, UseMiddleware, Arg, Ctx } from "type-graphql";
import { getRepository } from "typeorm";

import { Order } from "../../../entity/Order";
import { isAuth } from "../../../utils/isAuth";
import { Context } from "../../../types/Context"


@Resolver()
export class GetOrderResolver {
    @UseMiddleware(isAuth)
    @Query(() => Order)
    async getOrder(
        @Ctx() context: Context,
        @Arg("orderNo") orderNo: string
    ): Promise<Order | undefined> {
        console.log(context.req.session)
        if (orderNo === "last") {
            const orders = await Order.find({
                order: { orderNo: "DESC" },
                take: 1,
                relations: ["items", "customer"]
            });
            return orders[0];
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

        return orders[0];

        // await Order.findOne({ where: { orderNo: orderNo }, relations: ["items", "customer"] });


        // return await getRepository(Customer)
        //     .createQueryBuilder("customer")
        //     .leftJoinAndSelect(
        //         "customer.orders",
        //         "order"
        //     )
        //     .leftJoinAndSelect(
        //         "order.items",
        //         "item"
        //     )
        //     .orderBy("order.orderNo", "DESC")
        //     .addOrderBy("item.id", "ASC")
        //     .getMany();
    }
}
