import { TableCell, TableRow, Tooltip, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PublicIcon from '@mui/icons-material/Public';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import { Event } from '../types';
import { formatDate } from '@share/utils/formatDate';
import ActionButton from '@share/components/ActionButton';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import useAdminGetEventList from '../hooks/useAdminGetEventList';
import useOwnerDeleteEventById from '../hooks/useOwnerDeleteEventById';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';

const AdminEventListItem = ({
  data,
  onApprove,
  onReject,
}: {
  data: Event;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { reload } = useAdminGetEventList();
  const { fetchApi: deleteEvent } = useOwnerDeleteEventById();

  const onDeleteEvent = async (id: string) => {
    await deleteEvent({ eventId: id });
    reload();
  };

  const eventStatus = useMemo(() => {
    if (!data) {
      return 'not-open';
    }

    if (new Date(data.startTime) >= new Date()) {
      return 'opened';
    }

    if (data.endTime && new Date(data.endTime) > new Date()) {
      return 'running';
    }

    if (!data.endTime && !data.isEnded) {
      return 'running';
    }

    return 'ended';
  }, [data]);

  return (
    <>
      <TableRow>
        <TableCell align="left" sx={{ maxWidth: '200px' }}>
          <Typography>{data.title}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{data.hostInformation?.email}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
            {formatDate(new Date(data.startTime), 'dd/MM/yyyy - HH:ss')}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>
            {/* {data.approvedStatus === -1 ? (
              <Tooltip title="Đang chờ xác nhận">
                <MoreHorizIcon />
              </Tooltip>
            ) : null} */}
            {eventStatus === 'ended' ? (
              <Tooltip title="Đã kết thúc">
                <DirectionsRunIcon color="error" />
              </Tooltip>
            ) : (
              <Tooltip title="Chưa kết thúc">
                <DirectionsRunIcon color="success" />
              </Tooltip>
            )}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>
            {/* {data.approvedStatus === -1 ? (
              <Tooltip title="Đang chờ xác nhận">
                <MoreHorizIcon />
              </Tooltip>
            ) : null} */}
            {data.publicity === 'ALUMNI' ? (
              <Tooltip title="Chưa sẵn sàng nhận ủng hộ">
                <PublicIcon color="error" />
              </Tooltip>
            ) : null}
            {data.publicity === 'SCHOOL_ADMIN' ? (
              <Tooltip title="Sẵn sàng nhận ủng hộ">
                <PublicIcon color="success" />
              </Tooltip>
            ) : null}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <ActionButton
            actions={[
              {
                id: 'edit',
                text: 'Chỉnh sửa',
                onClick: () => router.push(`/admin/action/event/${data.id}`),
                icon: <EditIcon />,
              },
              {
                id: 'delete',
                text: 'Xoá ',
                onClick: () => setOpenDeleteModal(true),
                icon: <DeleteIcon color="error" />,
              },
            ]}
          />
        </TableCell>
        {/* <TableCell align="center">
          <Typography>
            {data.publicity === 'ALUMNI' ? (
              <Tooltip title="Bí mật">
                <DirectionsRunIcon color="error" />
              </Tooltip>
            ) : null}
            {data.publicity === 'SCHOOL_ADMIN' ? (
              <Tooltip title="Công khai">
                <DirectionsRunIcon color="success" />
              </Tooltip>
            ) : null}
            {data.approvedStatus === 1 ? (
              <Tooltip title="Đã được xác nhận">
                <DoneOutlineIcon color="success" />
              </Tooltip>
            ) : null}
          </Typography>
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
        </TableCell> */}
      </TableRow>

      <ConfirmDeleteModal
        open={openDeleteModal}
        title="Bạn muốn xoá sự kiện này?"
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => onDeleteEvent(data.id)}
      />
    </>
  );
};

export default AdminEventListItem;
