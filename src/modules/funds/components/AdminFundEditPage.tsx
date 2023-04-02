'use client';

import { Button, Stack, Tab, Tabs } from '@mui/material';
import { Box, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useAdminGetFundById from '../hooks/useAdminGetFundById';
import useOwnerUpdateFundById from '../hooks/useOwnerUpdateFundById';
import AdminFundReportTab from './AdminFundReportTab';
import FundForm, { FundFormValues } from './FundForm';

const AdminFundEditPage = () => {
  const [tabKey, setTabKey] = useState('info');

  const router = useRouter();
  const pathname = usePathname();

  const fundId = pathname?.split('/')[4] || '';

  const { fetchApi: updateFund } = useOwnerUpdateFundById();
  const {
    fetchApi: getFund,
    data,
    isLoading: isGettingFund,
  } = useAdminGetFundById();

  useEffect(() => {
    getFund({ fundId: fundId });
  }, []);

  const onUpdateFund = async (values: FundFormValues) => {
    await updateFund({ fundId: data?.data.id || '', ...values });
  };

  if (isGettingFund) {
    return <LoadingIndicator />;
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Chỉnh sửa thông tin quỹ
        </Typography>
        <Button variant="text" onClick={() => router.back()}>
          quay lại
        </Button>
      </Stack>

      <Tabs
        value={tabKey}
        onChange={(_, key) => setTabKey(key)}
        aria-label="wrapped tabs"
      >
        <Tab value="info" label="Thông tin cơ bản" />
        <Tab value="report" label="Cập nhập hoạt động" />
      </Tabs>

      {tabKey === 'info' ? (
        <FundForm initialData={data?.data} onSubmit={onUpdateFund} />
      ) : null}

      {tabKey === 'report' ? <AdminFundReportTab /> : null}
    </Box>
  );
};

export default AdminFundEditPage;
