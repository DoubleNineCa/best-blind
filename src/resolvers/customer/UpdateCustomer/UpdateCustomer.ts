import { getManager } from "typeorm";
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Customer } from "../../../entity/Customer";
import { isAuth } from "../../../utils/isAuth";
import { UpdateCustomerInput } from "./UpdateCustomerInput"

@Resolver()
export class UpdateCustomerResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateCustomer(
        @Arg("id") id: number,
        @Arg("data") updateCustomerInput: UpdateCustomerInput
    ): Promise<Boolean> {

        const curCustomer = await Customer.findOne(id);

        if (!curCustomer) {
            throw new Error("invalid request");
        }

        return getManager().transaction(async transactionalEntityManager => {
            return transactionalEntityManager
                .update(
                    Customer,
                    { id },
                    {
                        name: updateCustomerInput.name === undefined ? curCustomer.name : updateCustomerInput.name,
                        address: updateCustomerInput.address === undefined ? curCustomer.address : updateCustomerInput.address,
                        phone: updateCustomerInput.phone === undefined ? curCustomer.phone : updateCustomerInput.phone,
                        note: updateCustomerInput.note === undefined ? curCustomer.note : updateCustomerInput.note,
                        email: updateCustomerInput.email === undefined ? curCustomer.email : updateCustomerInput.email
                    }
                )
                .then(() => {
                    return true;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        });
    }
}