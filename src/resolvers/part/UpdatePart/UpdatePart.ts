import { getManager } from "typeorm";
import { Resolver, Mutation, Arg } from "type-graphql";

import { Part } from "../../../entity/Part";
import { PartInput } from "../PartInput";

@Resolver()
export class UpdatePartResolver {
    @Mutation(() => Boolean)
    async updatePart(
        @Arg("partId") partId: number,
        @Arg("data")
        { name, color, manufacturer, grade }: PartInput
    ): Promise<Boolean> {
        const part = await Part.findOne(partId);

        if (!part) {
            throw new Error(`${name} of grade does not exist`);
        }

        return getManager().transaction(async transactionalEntityManager => {
            return transactionalEntityManager
                .update(
                    Part,
                    { id: partId },
                    {
                        name: name === undefined ? part.name : name,
                        color: color === undefined ? part.color : color,
                        manufacturer: manufacturer === undefined ? part.manufacturer : manufacturer,
                        grade: grade === undefined ? part.grade : grade
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