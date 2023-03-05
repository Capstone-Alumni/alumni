import { Icon } from '@iconify/react';
import {
  Button,
  IconButton,
  TableCell,
  TableRow,
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
        <TableCell align="left">
          <Typography>{data.title}</Typography>
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
          <AdminJobPreview data={data}>
            <IconButton>
              <Icon height={24} icon="uil:eye" />
            </IconButton>
          </AdminJobPreview>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <IconButton onClick={() => onApprove(data.id)}>
            <Icon height={24} icon="uil:pen" />
          </IconButton>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <IconButton onClick={() => onReject(data.id)}>
            <Icon height={24} icon="uil:trash-alt" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminEventListItem;
