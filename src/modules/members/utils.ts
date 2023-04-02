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

export const compareRole = (role1?: AccessLevel, role2?: AccessLevel) => {
  if (!role1 || !role2) {
    return 0;
  }

  const role = ['ALUMNI', 'CLASS_MOD', 'GRADE_MOD', 'SCHOOL_ADMIN'];

  const role1Index = role.findIndex(r => r === role1);
  const role2Index = role.findIndex(r => r === role2);

  return role1Index - role2Index;
};
