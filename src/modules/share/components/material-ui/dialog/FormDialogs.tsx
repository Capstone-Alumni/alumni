import { useState } from 'react';
// material
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import EditProfileForm from '@share/components/_dashboard/user/profile/EditProfileForm';

// ----------------------------------------------------------------------
interface FormDialogsProps {
  buttonContent?: string
}

export default function FormDialogs({ buttonContent = "DEFAULT" }: FormDialogsProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>{buttonContent}</Button>

      <Dialog open={open} onClose={handleClose}>
       <EditProfileForm onClose={handleClose}/>
      </Dialog>
    </div>
  );
}
