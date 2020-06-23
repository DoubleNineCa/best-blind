import { getManager } from "typeorm";
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Order, Status } from "../../../entity/Order";
import { isAuth } from "../../../utils/isAuth";
import { PlaceOrderInput } from "../PlaceOrder/PlaceOrderInput";
import { totalCal } from "../../../utils/totalCalculator";


@Resolver()
export class UpdateOrderResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateOrder(
        @Arg("orderId") orderId: number,
        @Arg("installDate") installDate: Date,
        @Arg("data") {
            hst,
            deposit,
            discount,
            installation,
            installationDiscount,
            status,
            payment,
            invoiceDate,
            invAddress,
            invCity,
            invProvince,
            invPostal,
            midPayment,
            finalPayment }: PlaceOrderInput
    ): Promise<Boolean> {
        const order = await Order.findOne(orderId, { relations: ["items"] });
        // hst, deposit, installation, total, status, payment, installDate
        if (!order) {
            throw new Error("something went wrong");
        }

        if (!order.hst && order.status === Status.MEASURE && invoiceDate === undefined) {
            invoiceDate = order.invoiceDate;
        }

        return getManager().transaction(async transactionalEntityManager => {
            return transactionalEntityManager
                .update(
                    Order,
                    { id: orderId },
                    {
                        hst: hst === undefined ? order.hst : hst,
                        invoiceDate: invoiceDate === undefined ? order.invoiceDate : invoiceDate,
                        deposit: deposit === undefined ? order.deposit : deposit,
                        discount: discount === undefined ? order.discount : discount,
                        installation: installation === undefined ? order.installation : installation,
                        installationDiscount: installationDiscount === undefined ? order.installationDiscount : installationDiscount,
                        status: status === undefined ? order.status : status,
                        payment: payment === undefined ? order.payment : payment,
                        installDate: installDate === undefined ? order.installDate : installDate,
                        total: await totalCal(order.items, Number(discount), installation, installationDiscount),
                        invAddress: invAddress === undefined ? order.invAddress : invAddress,
                        invCity: invCity === undefined ? order.invCity : invCity,
                        invProvince: invProvince === undefined ? order.invProvince : invProvince,
                        invPostal: invPostal === undefined ? order.invPostal : invPostal,
                        midPayment: midPayment === undefined ? order.midPayment : midPayment,
                        finalPayment: finalPayment === undefined ? order.finalPayment : finalPayment
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