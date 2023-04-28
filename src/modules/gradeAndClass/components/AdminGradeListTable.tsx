import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetGradeListData } from '../types';
import AdminGradeListItem from './AdminGradeListItem';
import DataTablePagination from '@share/components/DataTablePagination';
import { useSetRecoilState } from 'recoil';
import { getGradeListParamsAtom } from '../state';
import { Box, useTheme } from '@mui/material';
import { useState } from 'react';
import SearchInput from '@share/components/SearchInput';
import Link from '@share/components/NextLinkV2';
import UploadGradeFileButton from './UploadGradeFileButton';
import { TEMPLATE_FILE } from '../constants';
import { CreateGradeParams } from '../hooks/useCreateGrade';

const AdminGradeListTable = ({
  data,
  onEdit,
  onDelete,
  reload,
  page,
  onChangePage,
}: {
  data: GetGradeListData;
  onEdit: (id: string, data: CreateGradeParams) => void;
  onDelete: (id: string) => void;
  reload: () => void;
  page: number;
  onChangePage: (nextPage: number) => void;
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const setParams = useSetRecoilState(getGradeListParamsAtom);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(2),
          alignItems: 'center',
          mb: 2,
        }}
      >
        <UploadGradeFileButton reload={reload} />

        <Link href={TEMPLATE_FILE} target="_blank">
          File mẫu
        </Link>
      </Box>
      <form
        onSubmit={e => {
          e.preventDefault();
          setParams(prevParams => ({ ...prevParams, code: search }));
        }}
        style={{ marginBottom: theme.spacing(2) }}
      >
        <SearchInput
          placeholder={'Tìm kiếm mã khoá, năm bắt đầu'}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
      <TableContainer component={Paper}>
        <Table aria-label="grade table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Mã</TableCell>
              <TableCell align="center">Năm bắt đầu</TableCell>
              <TableCell align="center">Năm kết thúc</TableCell>
              <TableCell align="left">Ngày được tạo</TableCell>
              <TableCell align="center">Số lớp</TableCell>
              <TableCell align="center">Danh sách lớp</TableCell>
              <TableCell align="center">Người đại diện</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map(row => (
              <AdminGradeListItem
                key={row.id}
                data={row}
                onDelete={onDelete}
                onEdit={onEdit}
                reload={reload}
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

export default AdminGradeListTable;
