import { useState } from 'react';
// material
import { Dialog } from '@mui/material';
import { Fund } from '../types';
import AdminFundDetailPage from './AdminFundDetailPage';

// ----------------------------------------------------------------------
interface FormDialogsProps {
  isPreview?: boolean;
  children?: React.ReactNode;
  data: Fund;
}

export default function AdminFundPreview({
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
              maxWidth: '80vw',
            },
          },
        }}
      >
        <AdminFundDetailPage fundData={data} />
      </Dialog>
    </>
  );
}
