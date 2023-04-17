import { ScopePublicity } from '@prisma/client';
import { Member } from 'src/modules/members/types';

export const canViewInformationDetail = (
  scope: ScopePublicity,
  owner: Member | null,
  requester: Member | null,
) => {
  if (!owner) {
    return false;
  }

  switch (scope) {
    case 'PRIVATE':
      return false;
    case 'CLASS':
      return owner.alumniToClass.find(cl => {
        const sameClass = requester?.alumniToClass.find(
          clRequester => clRequester.alumClassId === cl.alumClassId,
        );
        return sameClass;
      });
    case 'GRADE':
      return owner.alumniToClass.find(cl => {
        const sameClass = requester?.alumniToClass.find(
          clRequester => clRequester.alumClass.gradeId === cl.alumClass.gradeId,
        );
        return sameClass;
      });
    case 'SCHOOL':
      return requester;
    default:
      // eslint-disable-next-line no-case-declarations
      const _exhaustiveCheck: never = scope;
      return _exhaustiveCheck;
  }
};
