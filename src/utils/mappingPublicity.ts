import { Information, ScopePublicity } from '@prisma/client';
import { UserInformation } from '@share/states';

export const mappingScopPublicity = {
  SCHOOL: 'Trường',
  GRADE: 'Khoá',
  CLASS: 'Lớp',
  PRIVATE: 'Chỉ mình tôi',
};

export type ScopPublicityToFieldName = {
  emailPublicity: string;
  phonePublicity: string;
  facebookPublicity: string;
  dateOfBirthPublicity: string;
  careerPublicity: string;
  educationPublicity: string;
};

export const mappingScopPublicityToFieldName: any = {
  emailPublicity: 'Email',
  phonePublicity: 'Số điện thoại',
  facebookPublicity: 'Facebook',
  dateOfBirthPublicity: 'Ngày sinh',
  careerPublicity: 'Công việc',
  educationPublicity: 'Học vấn',
};

export const isAllowToViewValue = (
  currentUserInfomation: UserInformation,
  profileInfomation: Information,
  permissionToSee?: ScopePublicity,
): boolean => {
  if (currentUserInfomation?.userId === profileInfomation?.userId) {
    return true;
  }

  if (!permissionToSee) {
    return false;
  }
  if (permissionToSee === 'PRIVATE') {
    return false;
  }
  if (permissionToSee === 'SCHOOL') {
    return true;
  }

  if (permissionToSee === 'GRADE') {
    return currentUserInfomation.gradeName === profileInfomation.gradeName;
  } else if (permissionToSee === 'CLASS') {
    return currentUserInfomation.className === profileInfomation.className;
  }
  return false;
};
