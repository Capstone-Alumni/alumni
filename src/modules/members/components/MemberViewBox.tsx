import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { formatDate } from '@share/utils/formatDate';
import { Member } from '../types';

import { renderStatus } from './MemberListItem';

const MemberViewBox = ({
  data,
  onClose,
}: {
  data: Member;
  onClose?: () => void;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        padding: theme.spacing(4),
        borderRadius: `${theme.shape.borderRadiusSm}px`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: theme.spacing(4),
          right: theme.spacing(4),
        }}
      >
        <ClearIcon />
      </IconButton>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Thông tin cơ bản
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Họ và tên</Typography>
        <Typography>{data.information?.fullName}</Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Email</Typography>
        <Typography>{data.information?.email}</Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Số điện thoại</Typography>
        <Typography>{data.information?.phone}</Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Ngày sinh</Typography>
        <Typography>
          {data.information?.dateOfBirth
            ? formatDate(new Date(data.information.dateOfBirth))
            : ''}
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Facebook</Typography>
        <Typography>{data.information?.facebookUrl}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" sx={{ mb: 2 }}>
        Niên khoá và lớp
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack direction="column" gap={1} sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Trạng thái</Typography>
        <Typography>{renderStatus(data.lastLogin, data.createdAt)}</Typography>
      </Stack>
    </Box>
  );
};

export default MemberViewBox;
