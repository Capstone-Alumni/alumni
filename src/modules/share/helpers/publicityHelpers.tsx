import { AccessLevel } from '@prisma/client';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PublicIcon from '@mui/icons-material/Public';
import { Tooltip } from '@mui/material';

export const getPublicitySmallIcon = (publicity: AccessLevel) => {
  switch (publicity) {
    case 'ALUMNI':
      return (
        <Tooltip title="Chỉ mình tôi">
          <LockIcon fontSize="inherit" />
        </Tooltip>
      );
    case 'CLASS_MOD':
      return (
        <Tooltip title="Công khai với những người cùng lớp">
          <GroupIcon fontSize="inherit" />
        </Tooltip>
      );
    case 'GRADE_MOD':
      return (
        <Tooltip title="Công khai với những người cùng niên khoá">
          <Diversity3Icon fontSize="inherit" />
        </Tooltip>
      );
    case 'SCHOOL_ADMIN':
      return (
        <Tooltip title="Công khai với tất cả mọi người">
          <PublicIcon fontSize="inherit" />
        </Tooltip>
      );
    default:
      // eslint-disable-next-line no-case-declarations
      const exhaustiveCheck: never = publicity;
      return exhaustiveCheck;
  }
};
