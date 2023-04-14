import { Box, TableCell, TableRow, Tooltip, Typography } from '@mui/material';

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Event } from '../types';
import { formatDate } from '@share/utils/formatDate';
import { useRouter } from 'next/navigation';
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
            {data.hostInformation?.fullName}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography fontSize={'inherit'}>
            {formatDate(new Date(data.startTime), 'dd/MM/yyyy - HH:ss')}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography fontSize={'inherit'}>
            {eventStatus === 'ended' ? (
              <Tooltip title="Đã kết thúc">
                <DirectionsRunIcon color="error" />
              </Tooltip>
            ) : (
              <Tooltip title="Chưa kết thúc">
                <DirectionsRunIcon color="success" />
              </Tooltip>
            )}
            {/* <Image alt="live" src={LiveGIF} width="100" height="50" /> */}
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
