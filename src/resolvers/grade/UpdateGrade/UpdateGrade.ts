import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Grade } from "../../../entity/Grade";
import { GradeInput } from "../GradeInput";

@Resolver()
export class UpdateGradeResolver {
    @Mutation(() => Boolean)
    async updateGrade(
        @Arg("gradeId") gradeId: number,
        @Arg("data")
        { name, price }: GradeInput
    ): Promise<Boolean> {
        const grade = Grade.findOne(gradeId);

        if (!grade) {
            throw new Error(`${name} of grade does not exist`);
        }

        return getManager().transaction(async transactionalEntityManager => {
            return transactionalEntityManager
                .update(
                    Grade,
                    { id: gradeId },
                    {
                        name,
                        price
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