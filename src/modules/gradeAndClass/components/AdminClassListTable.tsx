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

const AdminClassListTable = ({
  data,
  onEdit,
  onDelete,
}: {
  data: {
    items: Class[];
    totalItems: number;
    itemPerPage: number;
  };
  onEdit: (id: string, data: ClassFormValues) => void;
  onDelete: (id: string) => void;
}) => {
  if (data.totalItems === 0) {
    return (
      <Typography textAlign="center" variant="h6">
        Chưa tạo lớp
      </Typography>
    );
  }

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
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminClassListTable;
