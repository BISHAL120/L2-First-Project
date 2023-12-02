import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(20),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherAddress: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  fatherContactNo: z.string().min(1).max(255),
  motherName: z.string().min(1).max(255),
  motherAddress: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
  motherContactNo: z.string().min(1).max(255),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255),
  occupation: z.string().min(1).max(255),
  contactNo: z.string().min(1).max(255),
  address: z.string().min(1).max(255),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    students: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.date().optional(),
      email: z.string().email(),
      contactNo: z.string().min(1).max(255),
      emergencyContactNo: z.string().min(1).max(255),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1).max(255),
      permanentAddress: z.string().min(1).max(255),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImages: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
