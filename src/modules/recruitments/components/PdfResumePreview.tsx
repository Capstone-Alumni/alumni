import { useState } from 'react';
// material
import { styled, Dialog } from '@mui/material';

// ----------------------------------------------------------------------
interface FormDialogsProps {
  resumeUrl?: string;
  children?: React.ReactNode;
}

const DialogStyled = styled(Dialog)(({ theme }) => ({
  width: '100vw',
  '& .MuiDialog-container': {
    width: '95vw',
    margin: '0 auto',
    '& .MuiPaper-root': {
      padding: theme.spacing(0),
      width: '100vw',
      height: '100vh',
      margin: '0 auto',
      maxWidth: '100vw',
    },
  },
}));

export default function PdfResumePreview({
  resumeUrl,
  children,
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
      <DialogStyled
        open={open}
        onClose={handleClose}
        sx={{ width: '100vw', margin: '0 auto' }}
      >
        <object
          data={resumeUrl}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <p>
            Alternative text - include a link{' '}
            <a href={resumeUrl}>to the PDF!</a>
          </p>
        </object>
      </DialogStyled>
    </div>
  );
}
