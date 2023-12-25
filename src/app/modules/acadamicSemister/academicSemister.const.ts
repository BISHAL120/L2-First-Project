import { TAcademicSemisterCode, TAcademicSemisterName, TAcademicSemisterNameCodeMapper, TMonths } from "./acadamicSemister.interface";


export const Months: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const academicSemisterName: TAcademicSemisterName[] = [
    'Autumn',
    'Summer',
    'Fall',
];
export const academicSemisterCode: TAcademicSemisterCode[] = [
    '01',
    '02',
    '03'
];

export const academicSemisterNameCodeMapper: TAcademicSemisterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03'
  }