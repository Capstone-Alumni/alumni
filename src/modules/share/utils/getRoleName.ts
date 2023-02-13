import { ACCESS_LEVEL } from 'src/modules/members/types';

const getRoleName = (role: ACCESS_LEVEL) => {
  switch (role) {
    case 'SCHOOL_ADMIN':
      return 'Quản lý toàn trường';
    case 'GRADE_MOD':
      return 'Đại diện khối';
    case 'CLASS_MOD':
      return 'Đại diện lớp';
    case 'ALUMNI':
      return 'Cựu học sinh';
    default:
      // eslint-disable-next-line no-case-declarations
      const _exhautiveCheck: never = role;
      return _exhautiveCheck;
  }
};

export default getRoleName;
