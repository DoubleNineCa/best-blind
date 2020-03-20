import { getManager } from "typeorm";
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Order, Status } from "../../../entity/Order";
import { isAuth } from "../../../utils/isAuth";

@Resolver()
export class UpdateStepResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateStep(
        @Arg("orderId") orderId: number,
    ): Promise<Boolean> {
        const order = await Order.findOne(orderId, { relations: ["items", "customer"] });

        if (!order) {
            throw new Error("something went wrong");
        }
        switch (order.status) {
            case Status.MEASURE:
                order.status = Status.MANUFACTURE;
                break;
            case Status.MANUFACTURE:
                order.status = Status.INSTALL;
                break;
            case Status.INSTALL:
                order.status = Status.REMAINING;
                if (order.installDate === undefined || order.installDate === null) {
                    order.installDate = new Date();
                }
                break;
            case Status.REMAINING:
                order.status = Status.COMPLETE;
                break;
        }

        order.save();

        return true;
    }
}