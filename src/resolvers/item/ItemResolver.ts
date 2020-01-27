import { Resolver } from "type-graphql";

import { CreateItemResolver } from "../../resolvers/item/CreateItem/CreateItem";
import { UpdateItemResolver } from "../../resolvers/item/UpdateItem/UpdateItem";
import { DeleteItemResolver } from "../../resolvers/item/DeleteItem/DeleteItem";

@Resolver()
class ItemResolver { }

export default Object.assign(
    CreateItemResolver,
    UpdateItemResolver,
    DeleteItemResolver
);