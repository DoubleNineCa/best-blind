import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Order } from "../../../entity/Order";
import { PlaceOrderInput } from "./PlaceOrderInput";
import { Item } from "../../../entity/Item";

@Resolver()
export class PlaceOrderResolver {
    @Mutation(() => Order)
    async placeOrder(
        @Arg("data") { orderNo, hst, deposit, installation, status, payment }: PlaceOrderInput
    ): Promise<Order | undefined> {

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

        const newOrder = Order.create({
            orderNo,
            hst,
            deposit,
            installation,
            status,
            payment,
            orderDate: new Date()
        });

        const order = Order.save(newOrder);

        return order;
    }
}