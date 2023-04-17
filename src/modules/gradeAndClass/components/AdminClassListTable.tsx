import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Class } from '../types';
import { ClassFormValues } from './ClassForm';
import AdminClassListItem from './AdminClassListItem';
import { Typography } from '@mui/material';
import DataTablePagination from '@share/components/DataTablePagination';
import SearchInput from '@share/components/SearchInput';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getClassListParamsAtom } from '../state';

const AdminClassListTable = ({
  data,
  onEdit,
  onDelete,
  reload,
  page,
  onChangePage,
}: {
  data: {
    items: Class[];
    totalItems: number;
    itemPerPage: number;
  };
  onEdit: (id: string, data: ClassFormValues) => void;
  onDelete: (id: string) => void;
  reload: () => void;
  page: number;
  onChangePage: (nextPage: number) => void;
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const setParams = useSetRecoilState(getClassListParamsAtom);

  if (data.totalItems === 0) {
    return (
      <Typography textAlign="center" variant="h6">
        Chưa tạo lớp
      </Typography>
    );
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          setParams(prevParams => ({ ...prevParams, name: search }));
        }}
        style={{ marginBottom: theme.spacing(2) }}
      >
        <SearchInput
          placeholder={'Tìm kiếm lớp'}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
      <TableContainer component={Paper}>
        <Table aria-label="Class table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Tên lớp</TableCell>
              <TableCell align="left">Ngày được tạo</TableCell>
              <TableCell align="center">Số thành viên</TableCell>
              <TableCell align="center">Người đại diện</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map(row => (
              <AdminClassListItem
                key={row.id}
                data={row}
                onDelete={onDelete}
                onEdit={onEdit}
                reload={reload}
              />
            ))}
          </TableBody>

          <DataTablePagination
            colSpan={4}
            currentPage={page}
            totalPage={Math.ceil(data.totalItems / data.itemPerPage)}
            onChangePage={onChangePage}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminClassListTable;
