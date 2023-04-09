'use client';

import { Box, Typography, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { currentTenantDataAtom } from '@share/states';
import Link from '@share/components/NextLinkV2';
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

        <Link
          href="https://firebasestorage.googleapis.com/v0/b/alumni-pf.appspot.com/o/T%C3%ADch%20h%E1%BB%A3p%20VNPay.pdf?alt=media&token=553e4427-e75a-4662-9ecf-23e43611c741"
          target="_blank"
        >
          <Typography>Hướng dẫn tích hợp</Typography>
        </Link>
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
