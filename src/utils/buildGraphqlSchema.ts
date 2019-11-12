import { buildSchemaSync } from "type-graphql";

import CustomerResolver from "../resolvers/customer/CustomerResolver";

export default () =>
    buildSchemaSync({
        resolvers: [CustomerResolver],
        emitSchemaFile: true
    });
