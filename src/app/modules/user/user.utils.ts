import { TAcadamicSemister } from "../acadamicSemister/acadamicSemister.interface";
import { userModel } from "./user.model";

const findLastStudent = async () => {
    const lastStudent = await userModel.findOne({
        role: 'student'
    }, {
        id: 1,
        _id: 0
    }).sort({
        createdAt: -1
    }).lean()

    return lastStudent?.id ? lastStudent.id : undefined;
}

// Faculty ID
export const findLastFacultyId = async () => {
    const lastFaculty = await userModel.findOne(
        {
            role: 'faculty',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
    let currentId = (0).toString();
    const lastFacultyId = await findLastFacultyId();
  
    if (lastFacultyId) {
      currentId = lastFacultyId.substring(2);
    }
  
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementId = `F-${incrementId}`;
  
    return incrementId;
  };



export const generateStudentID = async (payload: TAcadamicSemister) => {

    let currentID = (0).toString();

    const lastStudentID = await findLastStudent();
    const lastStudentSemisterCode = lastStudentID?.substring(4, 6);
    const lastStudentYear = lastStudentID?.substring(0, 4);
    const currentSemisterCode = payload.code;
    const currentYear = payload.year;


    if (lastStudentID && lastStudentSemisterCode === currentSemisterCode && lastStudentYear === currentYear) {
        currentID = lastStudentID.substring(6)
    }


    let incrementID = (Number(currentID) + 1).toString().padStart(4, '0');

    return incrementID = `${payload.year}${payload.code}${incrementID}`

}
