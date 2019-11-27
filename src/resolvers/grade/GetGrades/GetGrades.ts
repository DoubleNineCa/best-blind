import { Resolver, Query } from "type-graphql";

import { Grade } from "../../../entity/Grade";

@Resolver()
export class GetGradesResolver {
    @Query(() => [Grade])
    async getGrades(): Promise<Grade[]> {
        return Grade.find();
    }
}