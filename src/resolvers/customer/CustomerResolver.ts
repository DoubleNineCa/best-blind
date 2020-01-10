import { Resolver } from "type-graphql";

import { RegisterCustomerResolver } from "./RegisterCustomer/RegisterCustomer"
import { GetCustomersResolver } from "./GetCustomers/GetCustomers";
import { GetCustomerResolver } from "./GetCustomers/GetCustomer";

@Resolver()
class CustomerResolver { }

export default Object.assign(
    RegisterCustomerResolver,
    GetCustomersResolver,
    GetCustomerResolver
);
