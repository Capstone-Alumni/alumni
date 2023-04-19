import { isEmpty } from 'lodash';
import { Alumni } from '@share/states';

const getRoleName = (currentUserInformation: Alumni) => {
  if (currentUserInformation.isOwner) {
    return 'Quản lý toàn trường';
  }

  if (!isEmpty(currentUserInformation.gradeMod)) {
    return 'Đại diện khối';
  }

  // const isClassMod = currentUserInformation.alumniToClass?.some((class) => class.isClassMod)
  // if (isClassMod) {
  //   return 'Đại diện lớp';
  // }
  return 'Cựu học sinh';
  // switch (role) {
  //   case 'SCHOOL_ADMIN':
  //     return 'Quản lý toàn trường';
  //   case 'GRADE_MOD':
  //     return 'Đại diện khối';
  //   case 'CLASS_MOD':
  //     return 'Đại diện lớp';
  //   case 'ALUMNI':
  //     return 'Cựu học sinh';
  //   default:
  //     // eslint-disable-next-line no-case-declarations
  //     const _exhautiveCheck: never = role;
  //     return _exhautiveCheck;
  // }
};

export default getRoleName;
