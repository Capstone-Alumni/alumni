import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import useApproveAccessRequest from '../hooks/useApproveAccessRequest';
import useGetAccessRequestList from '../hooks/useGetAccessRequestList';
import useRejcetAccessRequest from '../hooks/useRejectAccessRequest';
import AdminAccessRequestListItem from './AdminAccessRequestListItem';

const AdminAccessRequestTable = () => {
  const { data, isLoading, reload } = useGetAccessRequestList();
  const { reject } = useRejcetAccessRequest();
  const { approve } = useApproveAccessRequest();

  const onApprove = async (id: string) => {
    await approve({ id });
    reload();
  };

  const onReject = async (id: string) => {
    await reject({ id });
    reload();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const accessRequestListData = data?.data;

  if (!accessRequestListData || accessRequestListData.totalItems === 0) {
    return (
      <Typography textAlign="center" variant="h6">
        Không có yêu cầu nào
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Typography variant="h5">Tổng số yêu cầu:</Typography>
        <Typography variant="h5" color="primary">
          {accessRequestListData.totalItems}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="access-request-table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Họ và tên</TableCell>
              <TableCell align="left">Ngày được tạo</TableCell>
              <TableCell sx={{ maxWidth: '3rem' }} />
              <TableCell sx={{ maxWidth: '3rem' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {accessRequestListData.items.map(row => (
              <AdminAccessRequestListItem
                key={row.id}
                data={row}
                onApprove={onApprove}
                onReject={onReject}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminAccessRequestTable;
