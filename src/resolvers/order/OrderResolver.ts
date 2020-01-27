import { Resolver } from "type-graphql";

import { PlaceOrderResolver } from "../../resolvers/order/PlaceOrder/PlaceOrder";
import { GetOrderResolver } from "./GetOrder/GetOrder"
import { GetOrdersResolver } from "../../resolvers/order/GetOrder/GetOrders";
import { UpdateOrderResolver } from "../../resolvers/order/UpdateOrder/UpdateOrder";
import { DeleteOrderResolver } from "../../resolvers/order/DeleteOrder/DeleteOrder"

@Resolver()
class OrderResolver { }

export default Object.assign(
    PlaceOrderResolver,
    GetOrderResolver,
    GetOrdersResolver,
    UpdateOrderResolver,
    DeleteOrderResolver
);