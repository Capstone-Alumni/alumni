import { Grade } from 'src/modules/gradeAndClass/types';

export const getGradeLongName = (grade: Grade) => {
  return `${grade.code ? grade.code + ': ' : ''}${grade.startYear} - ${
    grade.endYear
  }`;
};
