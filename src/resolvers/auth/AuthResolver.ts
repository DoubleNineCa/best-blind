import { Resolver } from "type-graphql";

import { LoginResolver } from "./Login/Login"
import { LogoutResolver } from "./Logout/Logout"
import { RegisterStaffResolver } from "./RegisterStaff/RegisterStaff"

@Resolver()
class AuthResolver { }

export default Object.assign(
    AuthResolver,
    LoginResolver,
    LogoutResolver,
    RegisterStaffResolver
);