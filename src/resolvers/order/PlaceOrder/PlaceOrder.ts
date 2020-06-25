import { getManager } from "typeorm";
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Order } from "../../../entity/Order";
import { PlaceOrderInput } from "./PlaceOrderInput";
import { isAuth } from "../../../utils/isAuth";
import { Customer } from "../../../entity/Customer";

@Resolver()
export class PlaceOrderResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Order)
    async placeOrder(
        @Arg("data") {
            customerId,
            orderNo,
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
            installAddress }: PlaceOrderInput
    ): Promise<Order | undefined> {

        const customer = await Customer.findOne(customerId, { relations: ["orders", "orders.items"] });

        if (!customer) {
            throw new Error("customer information is not exist");
        }

        const existOrder = customer.orders.filter(order => order.orderNo === orderNo)[0];

        if (existOrder) {
            throw new Error(`Order number ${orderNo} already exist`);
        }

        let newOrder = Order.create({
            orderNo,
            hst,
            deposit,
            discount,
            installation,
            installationDiscount,
            status,
            payment,
            orderDate: new Date(),
            invoiceDate,
            invAddress,
            invCity,
            invProvince,
            invPostal,
            installAddress
        });

        await getManager().transaction(async transactionalEntityManager => {
            if (customer!.orders.length === 0) {
                customer!.orders = new Array(newOrder);
            } else {
                customer!.orders.push(newOrder);
            }
            newOrder = await transactionalEntityManager.save(newOrder);
            await transactionalEntityManager.save(customer);

        });

        return newOrder;
    }
}