import { Resolver } from "type-graphql";

import { RegisterGradeResolver } from "../grade/RegisterGrade/RegisterGrade";
import { GetGradesResolver } from "../grade/GetGrades/GetGrades";
import { UpdateGradeResolver } from "../grade/UpdateGrade/UpdateGrade"

@Resolver()
class GradeResolver { }

export default Object.assign(
    RegisterGradeResolver,
    GetGradesResolver,
    UpdateGradeResolver
);
