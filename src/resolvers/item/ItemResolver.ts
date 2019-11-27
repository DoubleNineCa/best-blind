import { Resolver } from "type-graphql";

import { CreateItemResolver } from "../../resolvers/item/CreateItem/CreateItem";
import { UpdateItemResolver } from "../../resolvers/item/UpdateItem/UpdateItem";

@Resolver()
class ItemResolver { }

export default Object.assign(
    CreateItemResolver,
    UpdateItemResolver
);