import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Order } from "../../../entity/Order";
import { PlaceOrderInput } from "./PlaceOrderInput";
import { Item } from "../../../entity/Item";
import { Customer } from "../../../entity/Customer";

@Resolver()
export class PlaceOrderResolver {
    @Mutation(() => Order)
    async placeOrder(
        @Arg("data") { customerId, orderNo, hst, deposit, installation, status, payment }: PlaceOrderInput
    ): Promise<Order | undefined> {

        const customer = await Customer.findOne(customerId, { relations: ["orders", "orders.items"] });

        const existOrder = await Order.find({
            where: { orderNo: orderNo },
            relations: ["items"]
        });
        // const existOrder = await Order.find({ where: { orderNo: orderNo }, relations: ["items"] });
        // const existOrder = await Order.find({ where: { orderNo: orderNo } });

        console.log(existOrder);

        if (existOrder.length > 0) {
            throw new Error(`Order number ${orderNo} already exist`);
        }

        let newOrder = Order.create({
            orderNo,
            hst,
            deposit,
            installation,
            status,
            payment,
            orderDate: new Date()
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