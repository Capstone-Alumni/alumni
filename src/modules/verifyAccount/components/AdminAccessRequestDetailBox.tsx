import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { AccessRequest } from '../types';

import useApproveAccessRequest from '../hooks/useApproveAccessRequest';
import useGetAccessRequestList from '../hooks/useGetAccessRequestList';
import useRejcetAccessRequest from '../hooks/useRejectAccessRequest';
import { formatDate } from '@share/utils/formatDate';
import { Chip } from '@mui/material';

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

const AdminAccessRequestDetailBox = ({
  data,
  onClose,
}: {
  data: AccessRequest;
  onClose?: () => void;
}) => {
  const theme = useTheme();

  const { reload } = useGetAccessRequestList();
  const { reject, isLoading: rejecting } = useRejcetAccessRequest();
  const { approve, isLoading: approving } = useApproveAccessRequest();

  const onApprove = async () => {
    await approve({ id: data.id });
    reload();
    onClose?.();
  };

  const onReject = async () => {
    await reject({ id: data.id });
    reload();
    onClose?.();
  };

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
        Xét duyệt thành viên
      </Typography>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Họ và tên</Typography>
        <Typography>{data.fullName}</Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Số điện thoại</Typography>
        <Typography>{data.phone ? data.phone : 'Không cung cấp'}</Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Ngày sinh</Typography>
        <Typography>
          {data.dateOfBirth
            ? formatDate(new Date(data.dateOfBirth))
            : 'Không cung cấp'}
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Niên khoá</Typography>
        <Typography>
          {data.alumClass?.grade?.code ? `${data.alumClass.grade.code} ` : ''}
          {data.alumClass?.grade?.startYear} - {data.alumClass?.grade?.endYear}
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Lớp</Typography>
        <Typography>{data.alumClass?.name}</Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Email</Typography>
        <Typography>{data.email}</Typography>
      </Box>

      <Stack direction="column" gap={1} sx={{ mb: 1 }}>
        <Typography fontWeight={600}>Trạng thái</Typography>
        <Typography>{renderRequestStatus(data.requestStatus)}</Typography>
      </Stack>

      <Stack direction="row" gap={1} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={onReject}
          disabled={data.requestStatus !== 0 || rejecting || approving}
        >
          Từ chối
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={onApprove}
          disabled={data.requestStatus !== 0 || rejecting || approving}
        >
          Chấp nhận
        </Button>
      </Stack>
    </Box>
  );
};

export default AdminAccessRequestDetailBox;
