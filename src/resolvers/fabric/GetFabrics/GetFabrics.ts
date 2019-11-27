import { Resolver, Query } from "type-graphql";

import { Fabric } from "../../../entity/Fabric";

@Resolver()
export class GetFabricsResolver {
    @Query(() => [Fabric])
    async getFabrics(): Promise<Fabric[]> {
        return Fabric.find();
    }
}