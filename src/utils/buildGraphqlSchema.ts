import { buildSchemaSync } from "type-graphql";

import CustomerResolver from "../resolvers/customer/CustomerResolver";
import GradeResolver from "../resolvers/grade/GradeResolver";
import FabricResolver from "../resolvers/fabric/FabricResolver";
import ItemResolver from "../resolvers/item/ItemResolver"

export default () =>
    buildSchemaSync({
        resolvers: [CustomerResolver, GradeResolver, FabricResolver, ItemResolver],
        emitSchemaFile: true
    });
