import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { formatDate } from '@share/utils/formatDate';
import { Chip } from '@mui/material';
import { Member } from '../types';

import { renderStatus } from './MemberListItem';

const renderRequestStatus = (status: number) => {
  if (status === 0) {
    return (
      <Chip
        color="warning"
        variant="outlined"
        icon={<HourglassEmptyIcon color="warning" />}
        label="Đang chờ xét duyệt"
      />
    );
  }

  if (status === 1) {
    return (
      <Chip
        color="success"
        variant="outlined"
        icon={<CheckCircleOutlineIcon color="success" />}
        label="Đã chấp nhận"
      />
    );
  }

  if (status === 2) {
    return (
      <Chip
        color="error"
        variant="outlined"
        icon={<RemoveCircleOutlineIcon color="error" />}
        label="Đã từ chối"
      />
    );
  }

  return null;
};

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

      <Typography variant="h4" sx={{ mb: 2 }}>
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

      <Typography variant="h4" sx={{ mb: 2 }}>
        Niên khoá và lớp
      </Typography>

      <Stack direction="column" gap={1} sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Trạng thái</Typography>
        <Typography>{renderStatus(data.lastLogin, data.createdAt)}</Typography>
      </Stack>
    </Box>
  );
};

export default MemberViewBox;
