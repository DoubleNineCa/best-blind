import { buildSchemaSync } from "type-graphql";

import CustomerResolver from "../resolvers/customer/CustomerResolver";
import GradeResolver from "../resolvers/grade/GradeResolver";
import FabricResolver from "../resolvers/fabric/FabricResolver";

export default () =>
    buildSchemaSync({
        resolvers: [CustomerResolver, GradeResolver, FabricResolver],
        emitSchemaFile: true
    });
