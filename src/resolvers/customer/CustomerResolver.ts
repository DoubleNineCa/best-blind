import { Resolver } from "type-graphql";

import { GetCustomersResolver } from "./GetCustomers/GetCustomers";

@Resolver()
class CustomerResolver { }

export default Object.assign(
    GetCustomersResolver
);
