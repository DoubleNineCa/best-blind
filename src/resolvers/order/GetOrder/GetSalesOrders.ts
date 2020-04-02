import { Resolver, Query, UseMiddleware, Arg, Ctx } from "type-graphql";

import { Order } from "../../../entity/Order";
import { isAuth } from "../../../utils/isAuth";
import { Context } from "../../../types/Context"
import { Raw, MoreThanOrEqual, Between } from "typeorm";

@Resolver()
export class GetSalesOrdersResolver {
    @Query(() => [Order])
    async getSalesOrders(
        @Arg("year") year: string,
    ): Promise<Order[]> {
        const _year = year !== undefined && year !== "" ? Number(year) : new Date().getFullYear();
        return Order.find({
            where: [
                { installDate: Raw(alias => `${alias} >= '${_year}-01-01' AND ${alias} < '${_year + 1}-01-01'`) },
                { invoiceDate: Raw(alias => `${alias} >= '${_year}-01-01' AND ${alias} < '${_year + 1}-01-01'`) }
            ],
            relations: ["items", "customer"],
            order: { installDate: "ASC" }
        });
    }
}
