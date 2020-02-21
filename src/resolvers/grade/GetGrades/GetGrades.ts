import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";

import { Grade } from "../../../entity/Grade";
import { isAuth } from "../../../utils/isAuth";

@Resolver()
export class GetGradesResolver {
    @Query(() => [Grade])
    async getGrades(): Promise<Grade[]> {
        return Grade.find();
    }
}