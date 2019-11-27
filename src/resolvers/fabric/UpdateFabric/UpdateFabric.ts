import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Fabric } from "../../../entity/Fabric";
import { FabricInput } from "../FabricInput";

@Resolver()
export class UpdateFabricResolver {
    @Mutation(() => Boolean)
    async updateFabric(
        @Arg("fabricId") fabricId: number,
        @Arg("data")
        { name, color, manufacturer, grade }: FabricInput
    ): Promise<Boolean> {
        const fabric = await Fabric.findOne(fabricId);

        if (!fabric) {
            throw new Error(`${name} of grade does not exist`);
        }

        return getManager().transaction(async transactionalEntityManager => {
            return transactionalEntityManager
                .update(
                    Fabric,
                    { id: fabricId },
                    {
                        name: name === undefined ? fabric.name : name,
                        color: color === undefined ? fabric.color : color,
                        manufacturer: manufacturer === undefined ? fabric.manufacturer : manufacturer,
                        grade: grade === undefined ? fabric.grade : grade
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