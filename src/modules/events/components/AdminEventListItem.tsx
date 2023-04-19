import {
  Box,
  Button,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Event } from '../types';
import { formatDate } from '@share/utils/formatDate';
import { useMemo, useState } from 'react';
import useAdminGetEventList from '../hooks/useAdminGetEventList';
import useOwnerDeleteEventById from '../hooks/useOwnerDeleteEventById';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import {
  StyledBoxFlex,
  StyledIconWrapperMainShadow,
  StyledIconWrapperRedShadow,
} from '@share/components/styled';
import Link from '@share/components/NextLinkV2';
import AdminEventPreview from './AdminEventPreview';
import { getGradeLongName } from '@share/utils/getGradeName';

const AdminEventListItem = ({
  data,
}: {
  data: Event;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { reload } = useAdminGetEventList();
  const { fetchApi: deleteEvent } = useOwnerDeleteEventById();

  const onDeleteEvent = async (id: string) => {
    await deleteEvent({ eventId: id });
    reload();
  };

  const eventStatus = useMemo(() => {
    if (!data) {
      return 'not-started';
    }

    if (new Date(data.startTime) > new Date()) {
      return 'not-started';
    }

    if (data.endTime && new Date(data.endTime) > new Date()) {
      return 'running';
    }

    return 'ended';
  }, [data]);

  return (
    <>
      <TableRow sx={{ fontSize: '14px' }}>
        <TableCell align="left" sx={{ maxWidth: '200px' }}>
          <AdminEventPreview data={data}>
            <Tooltip
              title="Xem với chế độ công khai"
              sx={{ cursor: 'pointer' }}
            >
              <Typography fontSize={'inherit'}>{data.title}</Typography>
            </Tooltip>
          </AdminEventPreview>
        </TableCell>
        <TableCell align="left">
          <Typography fontSize={'inherit'}>
            {data.host?.information?.fullName}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography fontSize={'inherit'}>
            {data.isPublicSchool
              ? 'Tất cả'
              : data?.grade
              ? getGradeLongName(data.grade)
              : ''}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography fontSize={'inherit'}>
            {formatDate(new Date(data.startTime), 'dd/MM/yyyy - HH:ss')}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography fontSize={'inherit'}>
            {formatDate(new Date(data.endTime), 'dd/MM/yyyy - HH:ss')}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography fontSize={'inherit'}>
            {eventStatus === 'ended' ? (
              <Tooltip title="Đã kết thúc">
                <Button color="error" variant="outlined">
                  Đã kết thúc
                </Button>
              </Tooltip>
            ) : null}
            {eventStatus === 'running' ? (
              <Tooltip title="Đang diễn ra">
                <Button color="success" variant="outlined">
                  Đang diễn ra
                </Button>
              </Tooltip>
            ) : null}
            {eventStatus === 'not-started' ? (
              <Tooltip title="Chưa bắt đầu">
                <Button color="warning" variant="outlined">
                  Chưa bắt đầu
                </Button>
              </Tooltip>
            ) : null}
          </Typography>
        </TableCell>
        <TableCell align="center" sx={{ maxWidth: '3rem' }}>
          <StyledBoxFlex>
            <Tooltip title="Chỉnh sửa sự kiện">
              <StyledIconWrapperMainShadow>
                <Link prefetch={false} href={`/admin/action/event/${data.id}`}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <EditOutlinedIcon
                      fontSize="small"
                      sx={{
                        margin: 'auto',
                      }}
                    />
                  </Box>
                </Link>
              </StyledIconWrapperMainShadow>
            </Tooltip>
            <Tooltip title="Xóa sự kiện">
              <StyledIconWrapperRedShadow>
                <DeleteOutlineIcon
                  fontSize="small"
                  sx={{
                    margin: 'auto',
                    color: 'rgb(255, 72, 66)',
                  }}
                  onClick={() => setOpenDeleteModal(true)}
                />
              </StyledIconWrapperRedShadow>
            </Tooltip>
          </StyledBoxFlex>
        </TableCell>
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
