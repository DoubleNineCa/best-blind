import { Resolver, Query, Arg } from "type-graphql";

import { Customer } from "../../../entity/Customer";
import { Like } from "typeorm";

@Resolver()
export class GetCustomerResolver {
    @Query(() => Customer)
    async getCustomer(
        @Arg("id") id: number
    ): Promise<Customer | undefined> {
        return Customer.findOne(id, { relations: ["orders", "orders.items"] });
    }
}