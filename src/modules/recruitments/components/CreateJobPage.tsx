'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import JobForm, { JobFormValues } from './JobForm';
import { useRouter } from 'next/navigation';
import useCreateJob from '../hooks/useCreateJob';

const CreateJobPage = () => {
  const { fetchApi, error } = useCreateJob();
  const router = useRouter();

  const onCreateEvent = async (values: JobFormValues) => {
    await fetchApi(values);
    if (!error) {
      router.replace('/recruitments/posted_jobs');
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">Tạo công việc mới</Typography>
        <Button variant="text" onClick={() => router.back()}>
          quay lại
        </Button>
      </Stack>
      <JobForm onSubmit={onCreateEvent} />
    </Box>
  );
};

export default CreateJobPage;
