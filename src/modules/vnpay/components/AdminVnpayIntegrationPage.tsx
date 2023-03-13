'use client';

import { Box, Typography, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { currentTenantDataAtom } from '@share/states';
import { useRecoilValue } from 'recoil';
import useUpdateTenantVnpay from '../hooks/useUpdateTenantVnpay';
import VnpayForm from './VnpayForm';

const AdminVnpayIntegrationPage = () => {
  const theme = useTheme();
  const currentTenant = useRecoilValue(currentTenantDataAtom);

  const { fetchApi } = useUpdateTenantVnpay();

  if (!currentTenant.id) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: theme.spacing(4),
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" sx={{ flex: 1 }}>
          Tích hợp VNPay
        </Typography>

        <Typography>Hướng dẫn tích hợp</Typography>
      </Box>

      <VnpayForm
        initialData={{
          tmnCode: currentTenant?.vnp_tmnCode,
          hashSecret: currentTenant?.vnp_hashSecret,
        }}
        onSubmit={async value => {
          await fetchApi({ ...value, id: currentTenant.id });
        }}
      />
    </Box>
  );
};

export default AdminVnpayIntegrationPage;
