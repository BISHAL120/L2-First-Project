import catchAsync from "../../utils/catchAsync";
import { academicSemisterService } from "./academicSemister.service";


const createAcademicSemister = catchAsync(async (req, res) => {

    const result = await academicSemisterService.createAcademicSemisterIntoDB(req.body);

    res.status(200).json({
        success: true,
        message: 'Academic Semister is Created Successfully',
        data: result
    })
})



export const academicSemisterControllers = {
    createAcademicSemister,
}