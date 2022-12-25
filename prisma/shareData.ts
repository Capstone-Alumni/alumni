import { ERole } from '@prisma/client';

export const ADMIN_ROLE = {
  id: 1,
  roleName: ERole.ADMIN,
};

export const USER_ROLE = {
  id: 2,
  roleName: ERole.USER,
};
