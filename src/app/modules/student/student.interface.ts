export type userName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type guardian = {
  fatherName: string;
  fatherAddress: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherAddress: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type localGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type student = {
  id: string;
  name: userName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: guardian;
  localGuardian: localGuardian;
  profileImages?: string;
  isActive: 'active' | 'blocked';
};
