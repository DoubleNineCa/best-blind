import { Resolver, Mutation, Ctx, Arg } from "type-graphql";
import { getManager } from "typeorm";
import * as bcrypt from "bcryptjs";

import { Staff } from "../../../entity/Staff";
import { Context } from "../../../types/Context"
import { RegisterInput } from "./RegisterInput";


@Resolver()
export class RegisterStaffResolver {
    @Mutation(() => Staff)
    async registerStaff(
        @Arg("data")
        { staffId, password }: RegisterInput,
        @Ctx() ctx: Context
    ): Promise<Staff | undefined> {

        const hashedPassword = await bcrypt.hash(password, 12);

        const staff = Staff.create({
            staffId,
            password: hashedPassword
        });

        await getManager().transaction(async transactionalEntityManager => {
            await transactionalEntityManager.save(staff);
        })

        const isStaff = await Staff.findOne({ where: { staffId: staff.staffId } });

        if (isStaff) {
            ctx.req.session!.staffId = isStaff.id;
        }

        return isStaff;

    }


}