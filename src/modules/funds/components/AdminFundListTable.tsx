import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTablePagination from '@share/components/DataTablePagination';
import { AdminGetFundListData } from '../hooks/useAdminGetFundList';
import AdminFundListItem from './AdminFundListItem';
import SearchInput from '@share/components/SearchInput';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getAdminFundListParamsAtom } from '../states';
import { useTheme } from '@mui/material';

const AdminFundListTable = ({
  data,
  onApprove,
  onReject,
  page,
  onChangePage,
}: {
  data: AdminGetFundListData;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  page: number;
  onChangePage: (nextPage: number) => void;
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const setParams = useSetRecoilState(getAdminFundListParamsAtom);

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          setParams(prevParams => ({ ...prevParams, title: search }));
        }}
        style={{ marginBottom: theme.spacing(2) }}
      >
        <SearchInput value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>

      <TableContainer component={Paper}>
        <Table aria-label="Fund table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ maxWidth: '5rem' }}>
                Tên quỹ
              </TableCell>
              <TableCell align="left">Người tạo</TableCell>
              <TableCell align="left">Số tiền mục tiêu</TableCell>
              <TableCell align="left">Số tiền hiện tại</TableCell>
              <TableCell align="left">Thời gian Kết thúc</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map(row => (
              <AdminFundListItem
                key={row.id}
                data={row}
                onApprove={onApprove}
                onReject={onReject}
              />
            ))}
          </TableBody>

          <DataTablePagination
            colSpan={8}
            currentPage={page}
            totalPage={Math.ceil(data.totalItems / data.itemPerPage)}
            onChangePage={onChangePage}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminFundListTable;
