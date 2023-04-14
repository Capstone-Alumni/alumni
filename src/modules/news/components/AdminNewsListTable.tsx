import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DataTablePagination from '@share/components/DataTablePagination';
import { GetNewsListData } from '../types';
import AdminNewsListItem from './AdminNewsListItem';

const AdminNewsListTable = ({
  data,
  page,
  onPublic,
  onDelete,
  onChangePage,
}: {
  data: GetNewsListData;
  page: number;
  onPublic: (id: string, isPublic: boolean) => void;
  onDelete: (id: string) => void;
  onChangePage: (nextPage: number) => void;
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="event table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ maxWidth: '10rem' }} align="left">
                Tiêu đề tin
              </TableCell>
              <TableCell align="left">Tác giả</TableCell>
              <TableCell align="left">Ngày tạo</TableCell>
              <TableCell align="left">Thẻ tin</TableCell>
              <TableCell sx={{ maxWidth: '4.5rem' }}>Công khai</TableCell>
              <TableCell sx={{ maxWidth: '4rem', textAlign: 'center' }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map((row) => (
              <AdminNewsListItem
                key={row.id}
                data={row}
                onPublic={onPublic}
                onDelete={onDelete}
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

export default AdminNewsListTable;
