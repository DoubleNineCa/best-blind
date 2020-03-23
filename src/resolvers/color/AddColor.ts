import { Resolver, Mutation, UseMiddleware, Arg } from "type-graphql";

import { Color } from "../../entity/Color";
import { isAuth } from "../../utils/isAuth";

@Resolver()
export class AddColorResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Color)
    async addColor(
        @Arg("color") color: string
    ): Promise<Color | undefined> {

        let existColor = await Color.findOne({ where: { color: color } });

        if (!existColor) {
            const newColor = Color.create({ color });
            existColor = await Color.save(newColor);
        }
        return existColor;
    }
}