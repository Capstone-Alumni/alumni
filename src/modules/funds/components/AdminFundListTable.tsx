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
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Fund table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ maxWidth: '5rem' }}>
                Tên quỹ
              </TableCell>
              <TableCell align="left">Người tạo</TableCell>
              <TableCell align="left">Mục tiêu</TableCell>
              <TableCell align="left">Hiện tại</TableCell>
              <TableCell align="left">Thời gian Kết thúc</TableCell>
              <TableCell align="center">Đã kết thúc</TableCell>
              <TableCell align="center">Ủng hộ</TableCell>
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

export default AdminFundListTable;
