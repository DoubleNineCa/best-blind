import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { isAuth } from "../../../utils/isAuth";
import { Grade } from "../../../entity/Grade";

@Resolver()
export class DeleteGradeResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deleteGrade(
        @Arg("gradeId") gradeId: number,
    ): Promise<Boolean> {
        const grade = await Grade.findOne(gradeId);

        if (!grade) {
            throw new Error("Something went wrong");
        }

        await Grade.remove(grade);

        return true;
    }
}