'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DataTablePagination from '@share/components/DataTablePagination';
import { AdminGetReportListData } from '../hooks/useAdminGetReportList';
import ViewReportListItem from './ViewReportListItem';

const ViewReportListTable = ({
  data,
  onResponse,
  page,
  onChangePage,
  onDelete,
}: {
  data: AdminGetReportListData;
  page: number;
  onResponse: () => void;
  onChangePage: (nextPage: number) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="event table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ maxWidth: '6rem' }} align="left">
                Tên người gửi
              </TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell sx={{ maxWidth: '1rem' }} align="left">
                Ngày được tạo
              </TableCell>
              <TableCell sx={{ maxWidth: '8rem' }} align="center">
                Nội dung
              </TableCell>
              <TableCell sx={{ maxWidth: '8rem' }} align="center">
                Trả lời
              </TableCell>
              <TableCell sx={{ maxWidth: '4rem', textAlign: 'center' }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map(
              row =>
                !row.archived && (
                  <ViewReportListItem
                    key={row.id}
                    data={row}
                    onResponse={onResponse}
                    onDelete={onDelete}
                  />
                ),
            )}
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

export default ViewReportListTable;
