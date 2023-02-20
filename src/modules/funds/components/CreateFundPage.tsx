'use client';

import { Box, Typography } from '@mui/material';
import useCreateFund from '../hooks/useCreateFund';
import FundForm, { FundFormValues } from './FundForm';

const CreateFundPage = () => {
  const { fetchApi } = useCreateFund();

  const onCreateFund = async (values: FundFormValues) => {
    await fetchApi(values);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tạo yêu cầu gây quỹ
      </Typography>
      <FundForm onSubmit={onCreateFund} />
    </Box>
  );
};

export default CreateFundPage;
