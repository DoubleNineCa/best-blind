import { getManager } from "typeorm";
import { Resolver, Mutation, Ctx, UseMiddleware, Arg } from "type-graphql";

import { Grade } from "../../../entity/Grade";
import { GradeInput } from "../GradeInput";
import { isAuth } from "../../../utils/isAuth";

@Resolver()
export class RegisterGradeResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Grade)
    async registerGrade(
        @Arg("data") { name, price }: GradeInput
    ): Promise<Grade | undefined> {

        let existGrade = await Grade.findOne({ where: { name: name } });

        if (!existGrade) {
            const newGrade = Grade.create({
                name,
                price
            });
            existGrade = await Grade.save(newGrade);
        }
        return existGrade;
    }
}