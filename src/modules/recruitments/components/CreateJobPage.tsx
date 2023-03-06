'use client';

import { Box, Typography } from '@mui/material';
import useCreateEvent from '../hooks/useCreateJob';
import JobForm, { JobFormValues } from './JobForm';
import { useRouter } from 'next/navigation';

const CreateJobPage = () => {
  const { fetchApi, error } = useCreateEvent();
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
