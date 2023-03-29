import { useEffect, useState } from 'react';
// material
import { Dialog } from '@mui/material';

// ----------------------------------------------------------------------
interface PingMessageModalProps {
  children?: React.ReactNode;
}

export default function PingMessageModal({ children }: PingMessageModalProps) {
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
        <h1>diahidohoiawd</h1>
      </Dialog>
    </div>
  );
}
