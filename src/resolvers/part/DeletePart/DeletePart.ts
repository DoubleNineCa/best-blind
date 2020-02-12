import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { isAuth } from "../../../utils/isAuth";
import { Part } from "../../../entity/Part";

@Resolver()
export class DeletePartResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deletePart(
        @Arg("id") id: number,
    ): Promise<Boolean> {
        const part = await Part.findOne(id);

        if (!part) {
            throw new Error("Something went wrong");
        }

        await Part.delete(id);

        return true;
    }
}