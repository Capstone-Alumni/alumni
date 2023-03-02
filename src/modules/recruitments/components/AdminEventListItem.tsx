import { Icon } from '@iconify/react';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { Job } from '../types';

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
            {data.archived
              ? 'Đã từ chối'
              : data.isApproved
              ? 'Đã xác nhận'
              : 'Đang chờ xác nhận'}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{new Date(data.createdAt).toDateString()}</Typography>
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
