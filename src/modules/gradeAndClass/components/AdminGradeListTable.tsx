import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetGradeListData } from '../types';
import { GradeFormValues } from './GradeForm';
import AdminGradeListItem from './AdminGradeListItem';
import DataTablePagination from '@share/components/DataTablePagination';
import { useSetRecoilState } from 'recoil';
import { getGradeListParamsAtom } from '../state';
import { useTheme } from '@mui/material';
import { useState } from 'react';
import SearchInput from '@share/components/SearchInput';

const AdminGradeListTable = ({
  data,
  onEdit,
  onDelete,
  page,
  onChangePage,
}: {
  data: GetGradeListData;
  onEdit: (id: string, data: GradeFormValues) => void;
  onDelete: (id: string) => void;
  page: number;
  onChangePage: (nextPage: number) => void;
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const setParams = useSetRecoilState(getGradeListParamsAtom);

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          setParams(prevParams => ({ ...prevParams, code: search }));
        }}
        style={{ marginBottom: theme.spacing(2) }}
      >
        <SearchInput value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
      <TableContainer component={Paper}>
        <Table aria-label="grade table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Mã niên khoá</TableCell>
              <TableCell align="left">Ngày được tạo</TableCell>
              <TableCell align="center" sx={{ maxWidth: '3rem' }}>
                Lớp
              </TableCell>
              <TableCell sx={{ maxWidth: '3rem' }} />
              <TableCell sx={{ maxWidth: '3rem' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map(row => (
              <AdminGradeListItem
                key={row.id}
                data={row}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </TableBody>

          <DataTablePagination
            colSpan={6}
            currentPage={page}
            totalPage={Math.ceil(data.totalItems / data.itemPerPage)}
            onChangePage={onChangePage}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminGradeListTable;
