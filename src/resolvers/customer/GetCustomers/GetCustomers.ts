import { Resolver, Query, Arg } from "type-graphql";

import { Customer } from "../../../entity/Customer";
import { Like } from "typeorm";

@Resolver()
export class GetCustomersResolver {
    @Query(() => [Customer])
    async getCustomers(
        @Arg("keyword", { nullable: true }) keyword?: string
    ): Promise<Customer[]> {
        return keyword !== undefined ? Customer.find({
            where: [
                { name: Like(`%${keyword}%`) },
                { address: Like(`%${keyword}%`) }
            ],
            relations: ["orders", "orders.items"]
        })
            :
            Customer.find({ relations: ["orders", "orders.items"] });
    }
}