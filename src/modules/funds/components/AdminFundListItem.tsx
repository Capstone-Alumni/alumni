import {
  Button,
  // IconButton,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
// import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
// import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

  const getFundStatus = () => {
    if (data.publicity === 'ALUMNI') {
      return 'Chưa công khai';
    }
    const currentDate = new Date();
    if (data.publicity === 'SCHOOL_ADMIN') {
      if (currentDate > new Date(data.endTime)) {
        return 'Đã kết thúc';
      }
      return 'Đang diễn ra';
    }
  };

  const getFundStatusColor = () => {
    if (data.publicity === 'ALUMNI') {
      return 'info';
    }
    const currentDate = new Date();
    if (data.publicity === 'SCHOOL_ADMIN') {
      if (currentDate > new Date(data.endTime)) {
        return 'warning';
      }
    }
  };

  return (
    <>
      <TableRow>
        <TableCell align="left" sx={{ width: '20rem' }}>
          <Typography>{getShortTitle(data.title)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{data.hostInformation?.fullName}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatAmountMoney(data.targetBalance * 100)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatAmountMoney(data.currentBalance)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
            {formatDate(new Date(data.endTime), 'dd/MM/yyyy')}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography>
            <Button color={getFundStatusColor()} variant="outlined">
              {getFundStatus()}
            </Button>
          </Typography>
        </TableCell>
        <TableCell align="center">
          <ActionButton
            actions={[
              {
                id: 'edit',
                text: 'Chỉnh sửa',
                onClick: () => router.push(`/admin/action/funds/${data.id}`),
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
