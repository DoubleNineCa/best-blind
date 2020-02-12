import { Resolver, Query, Arg, UseMiddleware } from "type-graphql";
import { Like } from "typeorm";

import { Part, PartType } from "../../../entity/Part";
import { isAuth } from "../../../utils/isAuth";


@Resolver()
export class GetPartsResolver {
    @UseMiddleware(isAuth)
    @Query(() => [Part])
    async getParts(
        @Arg("type") type: PartType,
        @Arg("keyword") keyword?: string
    ): Promise<Part[]> {
        if (keyword === "" && type.toString() === "") {
            return Part.find({
                order: { type: "DESC", kind: "ASC", grade: "DESC", name: "ASC" }
            })
        }
        return Part.find({
            order: { type: "DESC", kind: "ASC", grade: "DESC" },
            where: [
                { type, name: Like(`%${keyword}%`) },
                { type, manufacturer: Like(`%${keyword}%`) },
            ]
        });
    }
}