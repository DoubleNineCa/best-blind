import { Resolver } from "type-graphql";

import { CreateItemResolver } from "../../resolvers/item/CreateItem/CreateItem";

@Resolver()
class ItemResolver { }

export default Object.assign(
    CreateItemResolver
);