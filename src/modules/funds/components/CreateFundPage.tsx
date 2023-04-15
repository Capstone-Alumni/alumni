'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import useCreateFund from '../hooks/useCreateFund';
import FundForm, { FundFormValues } from './FundForm';

const CreateFundPage = () => {
  const router = useRouter();

  const { fetchApi } = useCreateFund();

  const onCreateFund = async (values: FundFormValues) => {
    await fetchApi(values);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Tạo quỹ
        </Typography>
        <Button variant="text" onClick={() => router.back()}>
          Quay lại
        </Button>
      </Stack>
      <FundForm onSubmit={onCreateFund} />
    </Box>
  );
};

export default CreateFundPage;
