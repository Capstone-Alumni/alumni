import { useState } from 'react';
// material
import { Dialog } from '@mui/material';
import { Event } from '../types';
import EventDetailPagePreview from './EventDetailPagePreview';

// ----------------------------------------------------------------------
interface FormDialogsProps {
  isPreview?: boolean;
  children?: React.ReactNode;
  data: Event;
}

export default function AdminEventPreview({
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
    <>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              padding: '2rem',
              maxWidth: '100vw',
              height: '100vh',
            },
          },
        }}
      >
        <EventDetailPagePreview data={data} />
      </Dialog>
    </>
  );
}
