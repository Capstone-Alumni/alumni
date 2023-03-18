import {
  // IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
// import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
// import CancelIcon from '@mui/icons-material/Cancel';
import PublicIcon from '@mui/icons-material/Public';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Fund } from '../types';
import ActionButton from '@share/components/ActionButton';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import useOwnerDeleteFundById from '../hooks/useOwnerDeleteFundById';
import useAdminGetFundList from '../hooks/useAdminGetFundList';
import { formatDate } from '@share/utils/formatDate';
import { formatAmountMoney } from '../utils';
import { getShortTitle } from '@share/utils/getShortTitle';

const AdminFundListItem = ({
  data,
}: {
  data: Fund;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { reload } = useAdminGetFundList();
  const { fetchApi: deleteFund } = useOwnerDeleteFundById();

  const onDeleteFund = async (id: string) => {
    await deleteFund({ fundId: id });
    reload();
  };

  return (
    <>
      <TableRow>
        <TableCell align="left" sx={{ width: '20rem' }}>
          <Typography>{getShortTitle(data.title)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{data.hostInformation?.email}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatAmountMoney(data.targetBalance * 100)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatAmountMoney(data.currentBalance)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
            {formatDate(new Date(data.createdAt), 'dd/MM/yyyy - HH:ss')}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>
            {/* {data.approvedStatus === -1 ? (
              <Tooltip title="Đang chờ xác nhận">
                <MoreHorizIcon />
              </Tooltip>
            ) : null} */}
            {new Date(data.endTime) < new Date() ? (
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
                onClick: () => router.push(`/admin/funds/${data.id}`),
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
        {/* <TableCell align="center" sx={{ maxWidth: '3rem' }}>
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
        title="Bạn muốn xoá quỹ này?"
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => onDeleteFund(data.id)}
      />
    </>
  );
};

export default AdminFundListItem;
