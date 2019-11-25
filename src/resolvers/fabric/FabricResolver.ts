import { Resolver } from "type-graphql";

import { RegisterFabricResolver } from "../fabric/RegisterFabric/RegisterFabric";
@Resolver()
class FabricResolver { }

export default Object.assign(
    RegisterFabricResolver
);