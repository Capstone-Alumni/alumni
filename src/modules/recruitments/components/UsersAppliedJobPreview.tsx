import { useState } from 'react';
// material
import { Dialog, styled } from '@mui/material';
import { GetAppliedJobListByIdResponse } from '../hooks/usePublicGetAppliedJobListById';
import UsersAppliedJobListPage from './UsersAppliedJobListPage';
// ----------------------------------------------------------------------

const DialogStyled = styled(Dialog)(({ theme }) => ({
  width: '100vw',
  '& .MuiDialog-container': {
    width: '80vw',
    margin: '0 auto',
    '& .MuiPaper-root': {
      padding: theme.spacing(4),
      width: '100%',
      // height: '100%',
      margin: '0 auto',
    },
  },
}));

interface FormDialogsProps {
  isPreview?: boolean;
  children?: React.ReactNode;
  data: GetAppliedJobListByIdResponse | undefined;
}

export default function UsersAppliedJobPreview({
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
      <DialogStyled open={open} onClose={handleClose} maxWidth="xl">
        {!data ? (
          <h1>Chưa có người nộp</h1>
        ) : (
          <UsersAppliedJobListPage data={data} />
        )}
      </DialogStyled>
    </div>
  );
}
