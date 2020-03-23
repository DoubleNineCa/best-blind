import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Color } from "../../entity/Color";
import { isAuth } from "../../utils/isAuth";

@Resolver()
export class DeleteColorResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deleteColor(
        @Arg("color") color: string,
    ): Promise<Boolean> {
        const isColor = await Color.findOne({ where: { color: color } });

        if (!isColor) {
            throw new Error("Something went wrong");
        }

        await Color.remove(isColor);

        return true;
    }
}