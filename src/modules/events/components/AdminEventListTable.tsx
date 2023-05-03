import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import DataTablePagination from '@share/components/DataTablePagination';
import { AdminGetEventListData } from '../hooks/useAdminGetEventList';
import AdminEventListItem from './AdminEventListItem';
import SearchInput from '@share/components/SearchInput';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getAdminEventListParamsAtom } from 'src/modules/events/states';

const AdminEventListTable = ({
  data,
  onApprove,
  onReject,
  page,
  onChangePage,
}: {
  data: AdminGetEventListData;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  page: number;
  onChangePage: (nextPage: number) => void;
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const setParams = useSetRecoilState(getAdminEventListParamsAtom);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setParams((prevParams) => ({ ...prevParams, title: search }));
        }}
        style={{ marginBottom: theme.spacing(2) }}
      >
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
      <TableContainer component={Paper}>
        <Table aria-label="event table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Tên sự kiện</TableCell>
              <TableCell align="left">Người tạo</TableCell>
              <TableCell align="left">Niên khoá</TableCell>
              <TableCell align="left">Bắt đầu</TableCell>
              <TableCell align="left">Kết thúc</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map((row) => (
              <AdminEventListItem
                key={row.id}
                data={row}
                onApprove={onApprove}
                onReject={onReject}
              />
            ))}
          </TableBody>

          <DataTablePagination
            colSpan={6}
            currentPage={page}
            totalPage={Math.ceil(
              (data.totalItems || 1) / (data.itemPerPage || 1),
            )}
            onChangePage={onChangePage}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminEventListTable;
