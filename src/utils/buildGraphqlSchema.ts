import { buildSchemaSync } from "type-graphql";

import CustomerResolver from "../resolvers/customer/CustomerResolver";
import GradeResolver from "../resolvers/grade/GradeResolver";
import FabricResolver from "../resolvers/fabric/FabricResolver";
import ItemResolver from "../resolvers/item/ItemResolver";
import OrderResolver from "../resolvers/order/OrderResolver";

export default () =>
    buildSchemaSync({
        resolvers: [CustomerResolver, GradeResolver, FabricResolver, ItemResolver, OrderResolver],
        emitSchemaFile: true
    });
