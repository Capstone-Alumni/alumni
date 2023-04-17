import { Box, IconButton, Modal, Tooltip } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { TableCell, TableRow, Typography } from '@mui/material';
import { AccessRequest } from '../types';
import { formatDate } from '@share/utils/formatDate';
import { useState } from 'react';
import AdminAccessRequestDetailBox from './AdminAccessRequestDetailBox';

const renderApproveStatus = (status: number) => {
  if (status === 0) {
    return (
      <Tooltip title="Đang chờ xét duyệt">
        <HourglassEmptyIcon color="warning" />
      </Tooltip>
    );
  }

  if (status === 1) {
    return (
      <Tooltip title="Đã chấp nhận">
        <CheckCircleOutlineIcon color="success" />
      </Tooltip>
    );
  }

  if (status === 2) {
    return (
      <Tooltip title="Đã từ chối">
        <RemoveCircleOutlineIcon color="error" />
      </Tooltip>
    );
  }

  return null;
};

const AdminAccessRequestListItem = ({ data }: { data: AccessRequest }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <Typography>{data.fullName}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{data.email}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
            {data.alumClass?.grade?.startYear} -{' '}
            {data.alumClass?.grade?.endYear}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{data.alumClass?.name}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>{renderApproveStatus(data.requestStatus)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatDate(new Date(data.createdAt))}</Typography>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => setOpenDetailModal(true)}>
            <RemoveRedEyeIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Modal
        open={openDetailModal}
        onClose={() => {
          setOpenDetailModal(false);
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '30rem',
          }}
        >
          <AdminAccessRequestDetailBox
            data={data}
            onClose={() => {
              setOpenDetailModal(false);
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default AdminAccessRequestListItem;
