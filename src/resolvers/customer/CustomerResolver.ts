import { Resolver } from "type-graphql";

import { RegisterCustomerResolver } from "./RegisterCustomer/RegisterCustomer"
import { GetCustomersResolver } from "./GetCustomers/GetCustomers";

@Resolver()
class CustomerResolver { }

export default Object.assign(
    RegisterCustomerResolver,
    GetCustomersResolver
);
