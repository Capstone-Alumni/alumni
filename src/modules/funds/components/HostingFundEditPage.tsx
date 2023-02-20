'use client';

import { Box, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import useOwnerGetFundById from '../hooks/useOwnerGetFundById';
import useOwnerUpdateFundById from '../hooks/useOwnerUpdateFundById';
import FundForm, { FundFormValues } from './FundForm';

const HostingFundEditPage = () => {
  const pathname = usePathname();

  const fundId = pathname?.split('/')[3] || '';

  const { fetchApi: updateFund } = useOwnerUpdateFundById();
  const {
    fetchApi: getFund,
    data,
    isLoading: isGettingFund,
  } = useOwnerGetFundById();

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
      <Typography variant="h6" sx={{ mb: 2 }}>
        Chỉnh sửa thông tin quỹ
      </Typography>
      <FundForm initialData={data?.data} onSubmit={onUpdateFund} />
    </Box>
  );
};

export default HostingFundEditPage;
