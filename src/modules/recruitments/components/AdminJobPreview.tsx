import { useEffect, useState } from 'react';
// material
import { Dialog } from '@mui/material';
import JobForm from './JobForm';
import useOwnerGetJobById from '../hooks/useOwnerGetJobById';
import { Job } from '../types';

// ----------------------------------------------------------------------
interface FormDialogsProps {
  isPreview?: boolean;
  children?: React.ReactNode;
  data: Job;
}

export default function AdminJobPreview({
  isPreview,
  children,
  data,
}: FormDialogsProps) {
  const [open, setOpen] = useState(false);

  const {
    fetchApi: getJob,
    data: jobData,
    isLoading: isGettingJob,
  } = useOwnerGetJobById();

  useEffect(() => {
    getJob({ jobId: data.id });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ width: '700px', margin: '0 auto' }}
      >
        <JobForm isPreview initialData={jobData?.data} />
      </Dialog>
    </div>
  );
}
