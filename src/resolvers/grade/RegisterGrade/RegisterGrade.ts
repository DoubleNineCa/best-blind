import { getManager } from "typeorm";
import { Resolver, Mutation, Ctx, UseMiddleware, Arg } from "type-graphql";
import { Grade } from "../../../entity/Grade";

@Resolver()
export class RegisterGradeResolver {
    @Mutation(() => Grade)
    async registerGrade(
        @Arg("name") name: string,
        @Arg("price") price: number
    ): Promise<Grade | undefined> {

        let existGrade = await Grade.findOne({ where: { name: name } });
        console.log(existGrade, price, name);

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