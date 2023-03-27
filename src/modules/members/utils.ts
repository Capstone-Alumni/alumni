import { AccessLevel } from '@prisma/client';

export const getLowerRole = (role?: AccessLevel) => {
  if (!role) {
    return [];
  }

  switch (role) {
    case 'SCHOOL_ADMIN':
      return ['GRADE_MOD', 'CLASS_MOD', 'ALUMNI'];
    case 'GRADE_MOD':
      return ['CLASS_MOD', 'ALUMNI'];
    case 'CLASS_MOD':
      return ['ALUMNI'];
    case 'ALUMNI':
      return [];
    default:
      // eslint-disable-next-line no-case-declarations
      const _check: never = role;
      return _check;
  }
};
