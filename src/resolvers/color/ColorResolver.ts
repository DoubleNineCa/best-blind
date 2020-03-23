import { Resolver } from "type-graphql";

import { GetColorsResolver } from "./GetColors";
import { AddColorResolver } from "./AddColor";
import { DeleteColorResolver } from "./DeleteColor";

@Resolver()
class ColorResolver { }

export default Object.assign(
    GetColorsResolver,
    AddColorResolver,
    DeleteColorResolver
);
