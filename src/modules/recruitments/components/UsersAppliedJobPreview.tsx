import { useState } from 'react';
// material
import { Dialog } from '@mui/material';
import { GetAppliedJobListByIdResponse } from '../hooks/usePublicGetAppliedJobListById';
import UsersAppliedJobListPage from './UsersAppliedJobListPage';
// ----------------------------------------------------------------------
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
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ width: '80vw', margin: '0 auto' }}
      >
        {!data ? <h1>Chưa có người nộp</h1> : <UsersAppliedJobListPage />}
      </Dialog>
    </div>
  );
}
