import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Member } from '../types';
import { MemberFormValues } from './MemberForm';
import AdminMemberListItem from './MemberListItem';
import { Box, Typography, useTheme } from '@mui/material';
import DataTablePagination from '@share/components/DataTablePagination';
import SearchInput from '@share/components/SearchInput';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { getMemberListParamsAtom } from '../state';
import Link from '@share/components/NextLinkV2';
import { TEMPLATE_FILE } from '../constants';
import UploadMemeberFileButton from './UploadMemberFileButton';

const AdminMemberListTable = ({
  data,
  onEdit,
  onDelete,
  page,
  onChangePage,
}: {
  data: {
    items: Member[];
    totalItems: number;
    itemPerPage: number;
  };
  onEdit: (id: string, data: MemberFormValues) => void;
  onDelete: (id: string) => void;
  page: number;
  onChangePage: (page: number) => void;
}) => {
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const setParams = useSetRecoilState(getMemberListParamsAtom);

  if (data.totalItems === 0) {
    return (
      <Typography textAlign="center" variant="h6">
        Chưa tạo lớp
      </Typography>
    );
  }

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
        <UploadMemeberFileButton />

        <Link href={TEMPLATE_FILE} target="_blank">
          File mẫu
        </Link>
      </Box>

      <form
        onSubmit={e => {
          e.preventDefault();
          setParams(prevParams => ({ ...prevParams, name: search }));
        }}
        style={{ marginBottom: theme.spacing(2) }}
      >
        <SearchInput value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
      <TableContainer component={Paper}>
        <Table aria-label="Member table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Họ và tên</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Lớp</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map(row => (
              <AdminMemberListItem
                key={row.id}
                data={row}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </TableBody>
          <DataTablePagination
            colSpan={5}
            currentPage={page}
            totalPage={Math.ceil(data.totalItems / data.itemPerPage)}
            onChangePage={onChangePage}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminMemberListTable;
