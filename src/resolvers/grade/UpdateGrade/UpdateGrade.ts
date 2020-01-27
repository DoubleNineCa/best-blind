import { getManager } from "typeorm";
import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Grade } from "../../../entity/Grade";
import { GradeInput } from "../GradeInput";
import { isAuth } from "../../../utils/isAuth";

@Resolver()
export class UpdateGradeResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateGrade(
        @Arg("gradeId") gradeId: number,
        @Arg("data")
        { name, price }: GradeInput
    ): Promise<Boolean> {
        const grade = await Grade.findOne(gradeId);

        if (!grade) {
            throw new Error(`${name} of grade does not exist`);
        }

        return getManager().transaction(async transactionalEntityManager => {
            return transactionalEntityManager
                .update(
                    Grade,
                    { id: gradeId },
                    {
                        name: name === undefined ? grade.name : name,
                        price: price === 0 ? grade.price : price
                    }
                )
                .then(() => {
                    return true;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        });
    }
}