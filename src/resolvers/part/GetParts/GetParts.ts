import { Resolver, Query } from "type-graphql";

import { Part } from "../../../entity/Part";

@Resolver()
export class GetPartsResolver {
    @Query(() => [Part])
    async getParts(): Promise<Part[]> {
        return Part.find();
    }
}