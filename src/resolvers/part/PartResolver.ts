import { Resolver } from "type-graphql";

import { RegisterPartResolver } from "./RegisterPart/RegisterPart";
import { GetPartsResolver } from "./GetParts/GetParts";
import { UpdatePartResolver } from "./UpdatePart/UpdatePart";
import { DeletePartResolver } from "./DeletePart/DeletePart";

@Resolver()
class PartResolver { }

export default Object.assign(
    RegisterPartResolver,
    GetPartsResolver,
    UpdatePartResolver,
    DeletePartResolver
);