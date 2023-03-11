import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTablePagination from '@share/components/DataTablePagination';
import UsersAppliedJobListItem from './UsersAppliedJobListItem';
import { GetAppliedJobListByIdResponse } from '../hooks/usePublicGetAppliedJobListById';

const AdminEventListTable = ({
  data,
  page,
  onChangePage,
}: {
  data: GetAppliedJobListByIdResponse;
  page: number;
  onChangePage: (nextPage: number) => void;
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="event table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Họ tên</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Số điện thoại</TableCell>
              <TableCell sx={{ maxWidth: '2.5rem' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.items.map(
              row =>
                !row.archived && (
                  <UsersAppliedJobListItem key={row.id} data={row} />
                ),
            )}
          </TableBody>

          <DataTablePagination
            colSpan={6}
            currentPage={page}
            totalPage={Math.ceil(data.data.totalItems / data.data.itemPerPage)}
            onChangePage={onChangePage}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminEventListTable;
