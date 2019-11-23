import { Resolver } from "type-graphql";

import { PlaceOrderResolver } from "../../resolvers/order/PlaceOrder/PlaceOrder";
import { GetOrderResolver } from "./GetOrder/GetOrder"
import { GetOrdersResolver } from "../../resolvers/order/GetOrder/GetOrders";

@Resolver()
class OrderResolver { }

export default Object.assign(
    PlaceOrderResolver, GetOrderResolver, GetOrdersResolver
);