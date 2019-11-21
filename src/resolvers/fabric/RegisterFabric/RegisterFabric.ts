import { Resolver, Mutation, Arg } from "type-graphql";
import { Fabric } from "../../../entity/Fabric";
import { Grade } from "../../../entity/Grade";

@Resolver()
export class RegisterFabricResolver {
    @Mutation(() => Fabric)
    async registerFabric(
        @Arg("name") name: string,
        @Arg("manufacturer") manufacturer: string
    ): Promise<Fabric | undefined> {

        let existFabric = await Fabric.findOne({ where: { name: name } });

        if (!existFabric) {
            const grade = Grade.create();
            const newFabric = Fabric.create({ name, manufacturer, grade });
            existFabric = await Fabric.save(newFabric);
        }
        return existFabric;
    }
}