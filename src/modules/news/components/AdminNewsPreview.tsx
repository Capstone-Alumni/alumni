import { useState } from 'react';
// material
import { Dialog, styled } from '@mui/material';
import { News } from '../types';
import NewsContentPage from './NewsContentPage';

// ----------------------------------------------------------------------
interface FormDialogsProps {
  isPreview?: boolean;
  children?: React.ReactNode;
  data: News;
}

const DialogStyled = styled(Dialog)(({ theme }) => ({
  width: '100vw',
  '& .MuiDialog-container': {
    width: '100vw',
    margin: '0 auto',
    '& .MuiPaper-root': {
      padding: theme.spacing(4),
      width: '100vw',
      // height: '100%',
      // margin: '0 auto',
    },
  },
}));

export default function AdminNewsPreview({
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
              maxWidth: '100vw',
              height: '100vh',
            },
          },
        }}
      >
        <NewsContentPage data={data} />
      </Dialog>
    </>
  );
}
