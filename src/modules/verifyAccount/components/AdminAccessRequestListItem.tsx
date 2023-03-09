import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { TableCell, TableRow, Typography } from '@mui/material';
import { AccessRequest } from '../types';

const AdminAccessRequestListItem = ({
  data,
  onApprove,
  onReject,
}: {
  data: AccessRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Typography>{data.fullName}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{new Date(data.createdAt).toDateString()}</Typography>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => onApprove(data.id)}>
            <DoneOutlineIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => onReject(data.id)}>
            <Icon height={24} icon="uil:trash-alt" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminAccessRequestListItem;
