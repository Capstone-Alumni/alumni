import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionButton from '@share/components/ActionButton';
import { formatDate } from '@share/utils/formatDate';
import { usePathname } from 'next/navigation';
import useGetFundReportList from '../hooks/useGetFundReportList';
import { useMemo, useState } from 'react';
import LoadingIndicator from '@share/components/LoadingIndicator';
import AdminFundReportForm from './AdminFundReportForm';
import useUpdateFundReport from '../hooks/useUpdateFundReportList';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import useDeleteFundReport from '../hooks/useDeleteFundReport';
import { Typography } from '@mui/material';

const AdminFundReportList = () => {
  const [selectedEditId, setSelectedEditId] = useState('');
  const [selectedDeleteId, setSelectedDeleteId] = useState('');

  const pathname = usePathname();

  const fundId = pathname?.split('/')[4];

  const {
    data,
    isLoading: loadingReportList,
    fetchApi: getReportList,
  } = useGetFundReportList(fundId || '');
  const { fetchApi: updateReport } = useUpdateFundReport();
  const { fetchApi: deleteReport } = useDeleteFundReport();

  const selectedEditData = useMemo(
    () => data?.data.items.find(item => item.id === selectedEditId),
    [selectedEditId, data],
  );

  if (loadingReportList || !fundId) {
    return <LoadingIndicator />;
  }

  if (!data?.data.totalItems) {
    return (
      <Typography fontWeight={600} textAlign="center" sx={{ width: '100%' }}>
        Không có hoạt động nào
      </Typography>
    );
  }

  return (
    <>
      {selectedEditData ? (
        <AdminFundReportForm
          initialData={selectedEditData}
          onClose={() => setSelectedEditId('')}
          onSubmit={async values => {
            await updateReport({
              ...values,
              fundId: fundId,
              reportId: selectedEditId,
            });
            getReportList();
            setSelectedEditId('');
          }}
        />
      ) : null}

      <ConfirmDeleteModal
        open={!!selectedDeleteId}
        title="Bạn muốn xoá báo cáo này?"
        onClose={() => setSelectedDeleteId('')}
        onDelete={async () => {
          await deleteReport({
            fundId: fundId,
            reportId: selectedDeleteId,
          });
          getReportList();
        }}
      />

      <TableContainer component={Paper}>
        <Table aria-label="Fund table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Tiêu đề</TableCell>
              <TableCell align="left">Ngày tạo</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.items.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{formatDate(new Date(row.createdAt))}</TableCell>
                <TableCell align="center">
                  <ActionButton
                    actions={[
                      {
                        id: 'edit',
                        text: 'Chỉnh sửa',
                        onClick: () => setSelectedEditId(row.id),
                        icon: <EditIcon />,
                      },
                      {
                        id: 'delete',
                        text: 'Xoá ',
                        onClick: () => setSelectedDeleteId(row.id),
                        icon: <DeleteIcon color="error" />,
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminFundReportList;
