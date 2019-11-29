import { Resolver, Mutation, Arg } from "type-graphql";
import { Part, Type } from "../../../entity/Part";
import { Grade } from "../../../entity/Grade";

@Resolver()
export class RegisterPartResolver {
    @Mutation(() => Part)
    async registerPart(
        @Arg("type") type: Type,
        @Arg("name") name: string,
        @Arg("manufacturer") manufacturer: string,
        @Arg("color") color: string,
        @Arg("grade") grade: string
    ): Promise<Part | undefined> {

        let existFabric = await Part.findOne({ where: { name: name } });

        if (!existFabric) {
            const selectedGrade = await Grade.findOne({ where: { name: grade } });
            if (!selectedGrade) {
                throw new Error(`${grade} grade does not exist on the list`);
            }

            const newFabric = Part.create({ type, name, manufacturer, color, grade });
            existFabric = await Part.save(newFabric);
        } else {
            throw new Error(`${name} part item is already exist!`);
        }
        return existFabric;
    }
}