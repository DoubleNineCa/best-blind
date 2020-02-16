import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { RegisterCustomerInput } from "../../../resolvers/customer/RegisterCustomer/RegisterCustomerInput";
import { Customer } from "../../../entity/Customer";
import { isAuth } from "../../../utils/isAuth";


@Resolver()
export class RegisterCustomerResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Customer)
    async registerCustomer(
        @Arg("data") registerCustomerInput: RegisterCustomerInput
    ): Promise<Customer | undefined> {

        let curCustomer = await Customer.findOne({ where: { email: registerCustomerInput.email }, relations: ["orders"] });

        if (curCustomer) {
            throw new Error(`${name} with email "${registerCustomerInput.email}" is already exsite!`);
        }

        curCustomer = Customer.create({
            name: registerCustomerInput.name,
            address: registerCustomerInput.address,
            phone: registerCustomerInput.phone,
            email: registerCustomerInput.email,
            note: registerCustomerInput.note
        });

        const newCustomer = Customer.save(curCustomer);

        return newCustomer;
    }
}