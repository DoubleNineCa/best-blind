import { Resolver, Query } from "type-graphql";

import { isAuth } from "../../utils/isAuth";
import { Color } from "../../entity/Color";


@Resolver()
export class GetColorsResolver {
    @Query(() => [Color])
    async getColors(): Promise<Color[]> {
        return Color.find({ order: { color: "ASC" } });
    }
}