import { useState } from 'react';
// material
import { Dialog } from '@mui/material';
import JobForm from './JobForm';
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
        <JobForm isPreview={isPreview} initialData={data} />
      </Dialog>
    </div>
  );
}
