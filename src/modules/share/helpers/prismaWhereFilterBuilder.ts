import { AccessLevel } from '@prisma/client';

export const buildAccessLevelFilter = (
  fieldName: string,
  target: AccessLevel,
) => {
  let enums: string[] = [];
  switch (target) {
    case 'ALUMNI':
      enums = ['ALUMNI'];
      break;
    case 'CLASS_MOD':
      enums = ['ALUMNI', 'CLASS_MOD'];
      break;
    case 'GRADE_MOD':
      enums = ['ALUMNI', 'CLASS_MOD', 'GRADE_MOD'];
      break;
    case 'SCHOOL_ADMIN':
      enums = ['ALUMNI', 'CLASS_MOD', 'GRADE_MOD', 'SCHOOL_ADMIN'];
      break;
    default:
      enums = [];
  }

  return {
    OR: enums.map(e => {
      const cond: { [key: string]: { equals: string } } = {};
      cond[fieldName] = {
        equals: e,
      };
      return cond;
    }),
  };
};
