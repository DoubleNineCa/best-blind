import { Resolver, Query, Arg } from "type-graphql";

import { Customer } from "../../../entity/Customer";
import { Like, getRepository } from "typeorm";

@Resolver()
export class GetCustomersResolver {
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