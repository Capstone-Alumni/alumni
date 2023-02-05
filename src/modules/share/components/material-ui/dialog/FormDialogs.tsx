import { useState } from 'react';
// material
import { Button, Dialog, Box } from '@mui/material';
import EditVisibilityForm from '@share/components/_dashboard/user/profile/EditVisibilityForm';
import { Information } from '@prisma/client';

// ----------------------------------------------------------------------
interface FormDialogsProps {
  buttonContent?: string;
  children?: React.ReactNode;
  editType?: string;
  userInformation: Information;
}

export default function FormDialogs({
  buttonContent = 'DEFAULT',
  children,
  editType,
  userInformation,
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
      {children ? (
        <Box onClick={handleClickOpen}>{children}</Box>
      ) : (
        <Button variant="contained" onClick={handleClickOpen}>
          {buttonContent}
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        {editType === 'visibility' && (
          <EditVisibilityForm
            onClose={handleClose}
            userInformation={userInformation}
          />
        )}
      </Dialog>
    </div>
  );
}
