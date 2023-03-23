'use client';

import { Box, Typography } from '@mui/material';
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
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tạo công việc mới
      </Typography>
      <JobForm onSubmit={onCreateEvent} />
    </Box>
  );
};

export default CreateJobPage;
