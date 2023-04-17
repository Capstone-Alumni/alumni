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
import useGetAccessRequestList from '../hooks/useGetAccessRequestList';
import AdminAccessRequestListItem from './AdminAccessRequestListItem';

const AdminAccessRequestTable = () => {
  const { data, isLoading } = useGetAccessRequestList();

  if (isLoading && !data?.data) {
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
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Niên khoá</TableCell>
              <TableCell align="center">Lớp</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="left">Ngày được tạo</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accessRequestListData.items.map(row => (
              <AdminAccessRequestListItem key={row.id} data={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminAccessRequestTable;
