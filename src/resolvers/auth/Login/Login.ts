import * as bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import { Staff } from "../../../entity/Staff";
import { Context } from "../../../types/Context"

@Resolver()
export class LoginResolver {
    @Mutation(() => Staff, { nullable: true })
    async login(
        @Arg("staffId") staffId: string,
        @Arg("password") password: string,
        @Ctx() ctx: Context
    ): Promise<Staff | null> {

        const staff = await Staff.findOne({ where: { staffId } });

        if (!staff) {
            throw new Error("invalid login");
        }

        const valid = await bcrypt.compare(password, staff.password);

        if (!valid) {
            throw new Error("invalid Login request");
        }

        ctx.req.session!.staffId = staff.id;

        return staff;
    }
}