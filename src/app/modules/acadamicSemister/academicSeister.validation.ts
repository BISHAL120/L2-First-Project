import { z } from 'zod';
import { Months, academicSemisterCode, academicSemisterName } from './academicSemister.const';




const createAcademicSemisterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...academicSemisterName] as [string, ...string[]]),
        code: z.enum([...academicSemisterCode] as [string, ...string[]]),
        year: z.string(),
        startMonth: z.enum([...Months] as [string, ...string[]]),
        endMonth: z.enum([...Months] as [string, ...string[]])
    }),
});
const updateAcademicSemisterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...academicSemisterName] as [string, ...string[]]).optional(),
        code: z.enum([...academicSemisterCode] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
        endMonth: z.enum([...Months] as [string, ...string[]]).optional()
    }),
});

export const academicSemisterValidations = {
    createAcademicSemisterValidationSchema,
    updateAcademicSemisterValidationSchema,
};
