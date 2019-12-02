import { Resolver, Query, Arg } from "type-graphql";

import { Part, Type } from "../../../entity/Part";
import { Like } from "typeorm";

@Resolver()
export class GetPartsResolver {
    @Query(() => [Part])
    async getParts(
        @Arg("type") type: Type,
        @Arg("keyword") keyword?: string
    ): Promise<Part[]> {
        return Part.find({
            where: [
                { type, name: Like(`%${keyword}%`) },
                { type, manufacturer: Like(`%${keyword}%`) },
            ]
        });
    }
}