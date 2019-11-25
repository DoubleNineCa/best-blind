import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Customer } from "../../../entity/Customer";

@Resolver()
export class RegisterCustomerResolver {
    @Mutation(() => Customer)
    async registerCustomer(
        @Arg("name") name: string,
        @Arg("phone") phone: string,
        @Arg("address") address: string,
        @Arg("email") email: string,
        @Arg("note") note: string
        // @Arg("data") { orderId, blindId, width, height, handrailType }: CreateItemInput
    ): Promise<Customer | undefined> {

        let curCustomer = await Customer.findOne({ where: { email: email }, relations: ["orders"] });

        if (curCustomer) {
            throw new Error(`${name} with email "${email}" is already exsite!`);
        }

        curCustomer = Customer.create({
            name,
            phone,
            address,
            email,
            note
        });

        const newCustomer = Customer.save(curCustomer);

        return newCustomer;
    }
}