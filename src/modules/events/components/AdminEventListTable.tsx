import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTablePagination from '@share/components/DataTablePagination';
import { AdminGetEventListData } from '../hooks/useAdminGetEventList';
import AdminEventListItem from './AdminEventListItem';

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
  return (
    <>
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
            {data.items.map(row => (
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
