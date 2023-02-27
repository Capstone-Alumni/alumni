import { ScopePublicity } from '@prisma/client';
import { Class } from 'src/modules/gradeAndClass/types';
export const canViewInformationDetail = (
  scope: ScopePublicity,
  ownerClass: Class | null,
  requesterClass: Class | null,
) => {
  if (!ownerClass) {
    return false;
  }

  switch (scope) {
    case 'PRIVATE':
      return false;
    case 'CLASS':
      return ownerClass.id === requesterClass?.id;
    case 'GRADE':
      return ownerClass.gradeId === requesterClass?.gradeId;
    case 'SCHOOL':
      return requesterClass;
    default:
      // eslint-disable-next-line no-case-declarations
      const _exhaustiveCheck: never = scope;
      return _exhaustiveCheck;
  }
};
