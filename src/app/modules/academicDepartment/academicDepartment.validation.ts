import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'name is required',
    }),
    academicFaculty: z.string({
        invalid_type_error: 'Academic Faculty must be a string',
        required_error: 'Faculty must be a String'
    })
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
      name: z.string({
        invalid_type_error: 'Academic Department must be a string',
        required_error: 'name is required',
      }).optional(),
      academicFaculty: z.string({
          invalid_type_error: 'Academic Faculty must be a string',
          required_error: 'Faculty must be a String'
      }).optional(),
    }),
  });

export const academicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
