import { Resolver, Mutation, Arg } from "type-graphql";
import { Fabric } from "../../../entity/Fabric";
import { Grade } from "../../../entity/Grade";

@Resolver()
export class RegisterFabricResolver {
    @Mutation(() => Fabric)
    async registerFabric(
        @Arg("name") name: string,
        @Arg("manufacturer") manufacturer: string,
        @Arg("color") color: string,
        @Arg("grade") grade: string
    ): Promise<Fabric | undefined> {

        let existFabric = await Fabric.findOne({ where: { name: name } });

        if (!existFabric) {
            const selectedGrade = await Grade.findOne({ where: { name: grade } });
            if (!selectedGrade) {
                throw new Error(`${grade} grade does not exist on the list`);
            }

            const newFabric = Fabric.create({ name, manufacturer, color, grade });
            existFabric = await Fabric.save(newFabric);
        } else {
            throw new Error(`${name} fabric item is already exist!`);
        }
        return existFabric;
    }
}