import {
  Box,
  Button,
  // IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
// import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
// import CancelIcon from '@mui/icons-material/Cancel';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Fund } from '../types';
import { useState } from 'react';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import useOwnerDeleteFundById from '../hooks/useOwnerDeleteFundById';
import useAdminGetFundList from '../hooks/useAdminGetFundList';
import { formatDate } from '@share/utils/formatDate';
import { formatAmountMoney } from '../utils';
import { getShortTitle } from '@share/utils/getShortTitle';
import AdminFundPreview from './AdminFundPrview';
import {
  StyledBoxFlex,
  StyledIconWrapperMainShadow,
  StyledIconWrapperRedShadow,
} from '@share/components/styled';
import Link from '@share/components/NextLinkV2';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const AdminFundListItem = ({
  data,
}: {
  data: Fund;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { reload } = useAdminGetFundList();
  const { fetchApi: deleteFund } = useOwnerDeleteFundById();

  const onDeleteFund = async (id: string) => {
    await deleteFund({ fundId: id });
    reload();
  };

  const getFundStatus = () => {
    const currentDate = new Date();
    if (currentDate > new Date(data.endTime)) {
      return 'Đã kết thúc';
    }
    if (currentDate < new Date(data.startTime)) {
      return 'Chưa diễn ra';
    }
    return 'Đang diễn ra';
  };

  const getFundStatusColor = () => {
    const currentDate = new Date();
    if (currentDate < new Date(data.startTime)) {
      return 'info';
    }
    if (currentDate > new Date(data.endTime)) {
      return 'warning';
    }
    return 'success';
  };

  return (
    <>
      <TableRow>
        <TableCell align="left">
          <AdminFundPreview data={data}>
            <Typography
              sx={{
                cursor: 'pointer',
              }}
            >
              {getShortTitle(data.title)}
            </Typography>
          </AdminFundPreview>
        </TableCell>
        <TableCell align="left">
          <Typography>{data.host?.information?.fullName}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatAmountMoney(data.targetBalance * 100)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{formatAmountMoney(data.currentBalance)}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>
            {formatDate(new Date(data.startTime), 'dd/MM/yyyy')}
          </Typography>
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
          <StyledBoxFlex>
            <Tooltip title="Chỉnh sửa quỹ">
              <StyledIconWrapperMainShadow>
                <Link href={`/admin/action/funds/${data.id}`}>
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
            <Tooltip title="Xóa quỹ">
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
