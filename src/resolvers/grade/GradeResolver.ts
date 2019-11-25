import { Resolver } from "type-graphql";

import { RegisterGradeResolver } from "../grade/RegisterGrade/RegisterGrade";

@Resolver()
class GradeResolver { }

export default Object.assign(
    RegisterGradeResolver
);
