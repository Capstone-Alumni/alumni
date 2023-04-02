import { Box, Button, Divider, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import useCreateFundReport from '../hooks/useCreateFundReport';
import useGetFundReportList from '../hooks/useGetFundReportList';
import AdminFundReportForm from './AdminFundReportForm';
import AdminFundReportList from './AdminFundReportList';

const AdminFundReportTab = () => {
  const [openCreateForm, setOpenCreateForm] = useState(false);

  const theme = useTheme();
  const pathname = usePathname();

  const fundId = pathname?.split('/')[4];

  const { fetchApi: getReportList } = useGetFundReportList(fundId || '');
  const { fetchApi: createReport } = useCreateFundReport();

  if (!fundId) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        border: 1,
        borderColor: theme.palette.divider,
        borderRadius: `${theme.shape.borderRadius}px`,
      }}
    >
      {openCreateForm ? (
        <AdminFundReportForm
          onSubmit={async values => {
            await createReport({ ...values, fundId: fundId });
            getReportList();
            setOpenCreateForm(false);
          }}
          onClose={() => setOpenCreateForm(false)}
        />
      ) : (
        <Button variant="contained" onClick={() => setOpenCreateForm(true)}>
          Thêm
        </Button>
      )}

      <Divider sx={{ width: '100%' }} />

      <AdminFundReportList />
    </Box>
  );
};

export default AdminFundReportTab;
