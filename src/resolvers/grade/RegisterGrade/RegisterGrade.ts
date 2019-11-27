import { getManager } from "typeorm";
import { Resolver, Mutation, Ctx, UseMiddleware, Arg } from "type-graphql";
import { Grade } from "../../../entity/Grade";
import { GradeInput } from "../GradeInput";

@Resolver()
export class RegisterGradeResolver {
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