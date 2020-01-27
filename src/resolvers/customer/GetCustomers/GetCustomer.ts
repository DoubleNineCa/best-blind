import { Resolver, Query, Arg, UseMiddleware } from "type-graphql";

import { Customer } from "../../../entity/Customer";
import { isAuth } from "../../../utils/isAuth";

@Resolver()
export class GetCustomerResolver {
    @UseMiddleware(isAuth)
    @Query(() => Customer)
    async getCustomer(
        @Arg("id") id: number
    ): Promise<Customer | undefined> {
        return Customer.findOne(id, { relations: ["orders", "orders.items"] });
    }
}