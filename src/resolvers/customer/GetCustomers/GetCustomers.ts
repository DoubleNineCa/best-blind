import { Resolver, Query, Arg, UseMiddleware } from "type-graphql";

import { Customer } from "../../../entity/Customer";
import { isAuth } from "../../../utils/isAuth";
import { getRepository } from "typeorm";

@Resolver()
export class GetCustomersResolver {
    @UseMiddleware(isAuth)
    @Query(() => [Customer])
    async getCustomers(): Promise<Customer[]> {
        return await getRepository(Customer)
            .createQueryBuilder("customer")
            .leftJoinAndSelect(
                "customer.orders",
                "order"
            )
            .leftJoinAndSelect(
                "order.items",
                "item"
            )
            .orderBy("order.orderNo", "DESC")
            .addOrderBy("item.id", "ASC")
            .getMany();

        // tmp.map(customer => {
        //     customer.orders.map(order => {
        //         console.log(order.orderNo);
        //         order.items.map(item => {
        //             console.log(item.id);
        //         })
        //     })
        // })

        // console.log(keyword);
        // const tmp = await getRepository(Customer)
        //     .createQueryBuilder("customer")
        //     .leftJoinAndSelect(
        //         "customer.orders",
        //         "order"
        //     )
        //     .where("customer.name like :name", { name: `%${keyword}%` })
        //     .orderBy("order.orderNo", "DESC")
        //     .getMany();

        // return keyword !== undefined ? Customer.find({
        //     where: [
        //         { name: Like(`%${keyword}%`) },
        //         { address: Like(`%${keyword}%`) }
        //     ],
        //     relations: ["orders", "orders.items"]
        // })
        //     :

        //     Customer.find({ relations: ["orders", "orders.items"], order: { name: "ASC" } });
    }
}