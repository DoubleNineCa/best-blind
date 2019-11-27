import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Order, Status } from "../../../entity/Order";
import { PlaceOrderInput } from "../PlaceOrder/PlaceOrderInput";


@Resolver()
export class UpdateOrderResolver {
    @Mutation(() => Boolean)
    async updateOrder(
        @Arg("orderId") orderId: number,
        @Arg("installDate") installDate: Date,
        @Arg("data") { hst, deposit, installation, status, payment }: PlaceOrderInput
    ): Promise<Boolean> {
        const order = await Order.findOne(orderId, { relations: ["items"] });
        // hst, deposit, installation, total, status, payment, installDate
        if (!order) {
            throw new Error("something went wrong");
        }


        return getManager().transaction(async transactionalEntityManager => {
            return transactionalEntityManager
                .update(
                    Order,
                    { id: orderId },
                    {
                        hst: hst === undefined ? order.hst : hst,
                        deposit: deposit === undefined ? order.deposit : deposit,
                        installation: installation === undefined ? order.installation : installation,
                        status: status === undefined ? order.status : status,
                        payment: payment === undefined ? order.payment : payment,
                        installDate: installDate === undefined ? order.installDate : installDate
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