'use client';

import { Box, Typography } from '@mui/material';
import useCreateEvent from '../hooks/useCreateJob';
import JobForm, { JobFormValues } from './JobForm';

const CreateJobPage = () => {
  const { fetchApi } = useCreateEvent();

  const onCreateEvent = async (values: JobFormValues) => {
    await fetchApi(values);
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
