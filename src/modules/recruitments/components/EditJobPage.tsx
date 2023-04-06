'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import useOwnerGetJobById from '../hooks/useOwnerGetJobById';
import useOwnerUpdateJobById from '../hooks/useOwnerUpdateJobById';
import JobForm, { JobFormValues } from './JobForm';
import { useRouter } from 'next/navigation';

const EditJobPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const jobId = pathname?.split('/')[3] || '';

  const {
    fetchApi: updateJob,
    isLoading: isUpdating,
    error,
  } = useOwnerUpdateJobById();
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
    if (!error) {
      router.replace('/recruitments/posted_jobs');
    }
  };

  if (isGettingJob) {
    return <LoadingIndicator />;
  }

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6"> Chỉnh sửa công việc</Typography>
        <Button variant="text" onClick={() => router.back()}>
          quay lại
        </Button>
      </Stack>
      <JobForm initialData={data?.data} onSubmit={onUpdateJob} />
    </Box>
  );
};

export default EditJobPage;
