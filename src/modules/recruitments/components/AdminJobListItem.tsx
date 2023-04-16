import {
  Button,
  Switch,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Job } from '../types';
import AdminJobPreview from './AdminJobPreview';
import { formatDate } from '@share/utils/formatDate';

const AdminEventListItem = ({
  data,
  onApprove,
  onReject,
}: {
  data: Job;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  return (
    <>
      <TableRow sx={{ fontSize: '14px' }}>
        <TableCell align="left" sx={{ cursor: 'pointer' }}>
          <AdminJobPreview data={data}>
            <Tooltip title="Xem tóm tắt công việc">
              <Typography fontSize="inherit">{data.title}</Typography>
            </Tooltip>
          </AdminJobPreview>
        </TableCell>
        <TableCell align="left">
          <Typography fontSize="inherit">
            {data.recruitmentOwnerInfo?.fullName}
          </Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '8rem' }}>
          <Typography fontSize="inherit">
            {data.archived ? (
              <Button variant="outlined" size="small" color="error">
                Đã từ chối
              </Button>
            ) : data.isApproved ? (
              <Button variant="outlined" size="small" color="success">
                Đã chấp thuận
              </Button>
            ) : (
              <Button variant="outlined" size="small" color="warning">
                Chờ xác nhận
              </Button>
            )}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography fontSize="inherit">
            {formatDate(new Date(data.createdAt))}
          </Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '8rem' }}>
          <Tooltip
            title={
              data?.isApproved
                ? 'Ẩn công việc.'
                : 'Công khai công việc này cho mọi người.'
            }
          >
            <Switch
              checked={data.isApproved}
              onChange={() =>
                !data.isApproved ? onApprove(data.id) : onReject(data.id)
              }
            />
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminEventListItem;
