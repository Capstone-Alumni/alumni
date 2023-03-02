import {
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
        <TableCell align="center">
          <Typography>
            {data.approvedStatus === -1 ? (
              <Tooltip title="Đang chờ xác nhận">
                <MoreHorizIcon />
              </Tooltip>
            ) : null}
            {data.approvedStatus === 0 ? (
              <Tooltip title="Đã bị từ chối">
                <CancelIcon color="error" />
              </Tooltip>
            ) : null}
            {data.approvedStatus === 1 ? (
              <Tooltip title="Đã được xác nhận">
                <DoneOutlineIcon color="success" />
              </Tooltip>
            ) : null}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{new Date(data.createdAt).toDateString()}</Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <IconButton onClick={() => onApprove(data.id)}>
            <DoneOutlineIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <IconButton onClick={() => onReject(data.id)}>
            <CancelIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminEventListItem;
