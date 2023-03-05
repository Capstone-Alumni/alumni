'use client';

import { Box, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import useOwnerGetJobById from '../hooks/useOwnerGetJobById';
import useOwnerUpdateJobById from '../hooks/useOwnerUpdateJobById';
import JobForm, { JobFormValues } from './JobForm';

const EditJobPage = () => {
  const pathname = usePathname();

  const jobId = pathname?.split('/')[3] || '';

  const { fetchApi: updateJob, isLoading: isUpdating } =
    useOwnerUpdateJobById();
  const {
    fetchApi: getJob,
    data,
    isLoading: isGettingJob,
  } = useOwnerGetJobById();

  useEffect(() => {
    getJob({ jobId });
  }, []);

  const onUpdateJob = async (values: JobFormValues) => {
    await updateJob({ jobId: data?.data.id || '', ...values });
  };

  if (isGettingJob) {
    return <LoadingIndicator />;
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Chỉnh sửa công việc
      </Typography>
      <JobForm initialData={data?.data} onSubmit={onUpdateJob} />
    </Box>
  );
};

export default EditJobPage;