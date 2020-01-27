import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Customer } from "../../../entity/Customer";
import { isAuth } from "../../../utils/isAuth";

@Resolver()
export class DeleteCustomerResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deleteCustomer(
        @Arg("id") id: number,
    ): Promise<Boolean> {
        const customer = await Customer.findOne(id, { relations: ["orders", "orders.items"] });

        if (!customer) {
            throw new Error("Something went wrong");
        }

        await Customer.delete(id);

        return true;
    }
}