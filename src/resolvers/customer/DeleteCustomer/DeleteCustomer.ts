import { Resolver, Mutation, Arg } from "type-graphql";

import { Customer } from "../../../entity/Customer";

@Resolver()
export class DeleteCustomerResolver {
    @Mutation(() => Boolean)
    async deleteCustomer(
        @Arg("id") id: number,
    ): Promise<Boolean> {
        const customer = await Customer.findOne(id);

        if (!customer) {
            throw new Error("Something went wrong");
        }

        await Customer.delete(id);

        return true;
    }
}