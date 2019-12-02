import { Resolver, Mutation, Arg } from "type-graphql";
import { Part, Type } from "../../../entity/Part";
import { Grade } from "../../../entity/Grade";
import { PartInput } from "../PartInput";

@Resolver()
export class RegisterPartResolver {
    @Mutation(() => Part)
    async registerPart(
        @Arg("data") { type, kind, name, manufacturer, color, grade, modelNo, stocks }: PartInput
    ): Promise<Part | undefined> {

        let existFabric = await Part.findOne({ where: { name: name } });

        if (!existFabric) {
            const selectedGrade = await Grade.findOne({ where: { name: grade } });
            if (!selectedGrade) {
                throw new Error(`${grade} grade does not exist on the list`);
            }

            const newFabric = Part.create({ type, kind, name, manufacturer, color, grade, modelNo, stocks });
            existFabric = await Part.save(newFabric);
        } else {
            throw new Error(`${name} part is already exist!`);
        }
        return existFabric;
    }
}