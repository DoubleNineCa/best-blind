import { Resolver, Query, Arg, UseMiddleware } from "type-graphql";
import { Like } from "typeorm";

import { Part, Type } from "../../../entity/Part";
import { isAuth } from "../../../utils/isAuth";


@Resolver()
export class GetPartsResolver {
    @UseMiddleware(isAuth)
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