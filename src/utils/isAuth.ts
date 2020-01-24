import { MiddlewareFn } from "type-graphql";

import { Context } from "../types/Context";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
    console.log("AUTH :", context.req.session!.id);
    if (!context.req.session!.staffId) {
        throw new Error("not authenticated");
    }

    return next();
};
