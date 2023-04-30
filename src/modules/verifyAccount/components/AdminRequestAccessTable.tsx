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
  useTheme,
} from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import useGetAccessRequestList from '../hooks/useGetAccessRequestList';
import AdminAccessRequestListItem from './AdminAccessRequestListItem';
import DataTablePagination from '@share/components/DataTablePagination';
import { useRecoilState } from 'recoil';
import { getAccessRequestListParamsAtom } from '../states';
import SearchInput from '@share/components/SearchInput';
import { useState } from 'react';

const AdminAccessRequestTable = () => {
  const { data, isLoading } = useGetAccessRequestList();
  const [params, setParams] = useRecoilState(getAccessRequestListParamsAtom);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const theme = useTheme();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const accessRequestListData = data?.data;

  if (
    (!accessRequestListData || accessRequestListData.totalItems === 0) &&
    !isSearching
  ) {
    return (
      <Typography textAlign="center" variant="h6">
        Không có yêu cầu nào
      </Typography>
    );
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          setParams(prevParams => ({ ...prevParams, name: search }));
          setIsSearching(search.length > 0);
        }}
        style={{ marginBottom: theme.spacing(2) }}
      >
        <SearchInput value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Typography variant="h5">
          {!isSearching ? 'Tổng số yêu cầu:' : 'Số lượng kết quả:'}
        </Typography>
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

          <DataTablePagination
            colSpan={7}
            currentPage={params.page}
            totalPage={Math.ceil(
              accessRequestListData.totalItems /
                accessRequestListData.itemPerPage,
            )}
            onChangePage={(nextPage: number) => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminAccessRequestTable;
