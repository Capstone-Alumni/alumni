import { Icon } from '@iconify/react';
import {
  Button,
  IconButton,
  Switch,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Job } from '../types';
import AdminJobPreview from './AdminJobPreview';

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
      <TableRow>
        <TableCell align="left" sx={{ cursor: 'pointer' }}>
          <AdminJobPreview data={data} isPreview>
            <Tooltip title="Xem tóm tắt công việc">
              <Typography>{data.title}</Typography>
            </Tooltip>
          </AdminJobPreview>
        </TableCell>
        <TableCell align="left">
          <Typography>{data.recruitmentOwnerInfo?.fullName}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
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
                Đang chờ xác nhận
              </Button>
            )}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{new Date(data.createdAt).toDateString()}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <AdminJobPreview data={data} isPreview>
            <Tooltip title="Xem tóm tắt công việc">
              <IconButton>
                <Icon height={24} icon="uil:eye" />
              </IconButton>
            </Tooltip>
          </AdminJobPreview>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
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
