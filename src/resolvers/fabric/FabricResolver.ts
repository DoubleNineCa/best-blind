import { Resolver } from "type-graphql";

import { RegisterFabricResolver } from "../fabric/RegisterFabric/RegisterFabric";
import { GetFabricsResolver } from "../../resolvers/fabric/GetFabrics/GetFabrics";
import { UpdateFabricResolver } from "../../resolvers/fabric/UpdateFabric/UpdateFabric";

@Resolver()
class FabricResolver { }

export default Object.assign(
    RegisterFabricResolver,
    GetFabricsResolver,
    UpdateFabricResolver
);