import { buildSchemaSync } from "type-graphql";

import CustomerResolver from "../resolvers/customer/CustomerResolver";
import GradeResolver from "../resolvers/grade/GradeResolver";
import PartResolver from "../resolvers/part/PartResolver";
import ItemResolver from "../resolvers/item/ItemResolver";
import OrderResolver from "../resolvers/order/OrderResolver";

export default () =>
    buildSchemaSync({
        resolvers: [CustomerResolver, GradeResolver, PartResolver, ItemResolver, OrderResolver],
        emitSchemaFile: true
    });
