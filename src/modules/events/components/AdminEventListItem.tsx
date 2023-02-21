import { Icon } from '@iconify/react';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { Event } from '../types';

const AdminEventListItem = ({
  data,
  onApprove,
  onReject,
}: {
  data: Event;
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
          <Typography>{data.hostInformation?.email}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
            {data.approvedStatus === -1 ? 'Đang chờ xác nhận' : null}
            {data.approvedStatus === 0 ? 'Đã bị từ chối' : null}
            {data.approvedStatus === 1 ? 'Đã được xác nhận' : null}
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
