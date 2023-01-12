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
import DataTablePagination from '@share/components/DataTablePagination';

const AdminClassListTable = ({
  data,
  onEdit,
  onDelete,
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
  page: number;
  onChangePage: (nextPage: number) => void;
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Class table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Tên lớp</TableCell>
              <TableCell align="left">Ngày được tạo</TableCell>
              <TableCell sx={{ maxWidth: '3rem' }} />
              <TableCell sx={{ maxWidth: '3rem' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map(row => (
              <AdminClassListItem
                key={row.id}
                data={row}
                onDelete={onDelete}
                onEdit={onEdit}
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
