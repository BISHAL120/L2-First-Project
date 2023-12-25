import { Types } from "mongoose";

export type  TAcademicDepartmentn = {
    name: string;
    academicFaculty: Types.ObjectId;
}