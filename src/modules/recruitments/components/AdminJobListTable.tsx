import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTablePagination from '@share/components/DataTablePagination';
import { AdminGetJobListData } from '../hooks/useAdminGetJobList';
import AdminEventListItem from './AdminJobListItem';

const AdminEventListTable = ({
  data,
  onApprove,
  onReject,
  page,
  onChangePage,
}: {
  data: AdminGetJobListData;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  page: number;
  onChangePage: (nextPage: number) => void;
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="event table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Tên công việc</TableCell>
              <TableCell align="left">Người gửi yêu cầu</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              <TableCell align="left">Ngày được tạo</TableCell>
              <TableCell sx={{ maxWidth: '2.5rem' }}>Xem trước</TableCell>
              <TableCell sx={{ maxWidth: '2.5rem' }}>
                Công khai công việc
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map(
              row =>
                !row.archived && (
                  <AdminEventListItem
                    key={row.id}
                    data={row}
                    onApprove={onApprove}
                    onReject={onReject}
                  />
                ),
            )}
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

export default AdminEventListTable;
