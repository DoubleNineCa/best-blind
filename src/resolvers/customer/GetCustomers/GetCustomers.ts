import { Resolver, Query, UseMiddleware } from "type-graphql";

import { Customer } from "../../../entity/Customer";

@Resolver()
export class GetCustomersResolver {
    @Query(() => [Customer])
    async getUsers(): Promise<Customer[]> {
        return Customer.find();
    }
}
