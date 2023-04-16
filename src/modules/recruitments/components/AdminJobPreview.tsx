import { useState } from 'react';
// material
import { Dialog } from '@mui/material';
import { Job } from '../types';
import JobDetailPagePreview from './JobDetailPagePreview';

// ----------------------------------------------------------------------
interface AdminJobPreviewProps {
  children?: React.ReactNode;
  data: Job;
}

export default function AdminJobPreview({
  children,
  data,
}: AdminJobPreviewProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(data);
  return (
    <>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              padding: '1rem',
              maxWidth: '90vw',
              height: '100vh',
            },
          },
        }}
      >
        <JobDetailPagePreview data={data} />
      </Dialog>
    </>
  );
}
