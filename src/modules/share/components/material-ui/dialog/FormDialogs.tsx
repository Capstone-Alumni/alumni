import { useState } from 'react';
// material
import { Button, Dialog, Box } from '@mui/material';
import EditVisibilityForm from '@share/components/_dashboard/user/profile/EditVisibilityForm';
import { Information, ScopePublicity } from '@prisma/client';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mappingScopPublicity } from 'src/utils/mappingPublicity';

// ----------------------------------------------------------------------
interface FormDialogsProps {
  buttonContent?: string;
  children?: React.ReactNode;
  editType?: string;
  userInformation: any;
  name: string;
}

export default function FormDialogs({
  buttonContent = 'DEFAULT',
  children,
  editType,
  userInformation,
  name,
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
        <Box onClick={handleClickOpen}>
          <Tooltip
            title={
              name
                ? mappingScopPublicity[userInformation[name] as ScopePublicity]
                : 'Tuỷ chỉnh quyền riêng tư'
            }
          >
            <IconButton sx={{ height: '24px', width: '24px' }}>
              {children}
            </IconButton>
          </Tooltip>
        </Box>
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
            name={name}
          />
        )}
      </Dialog>
    </div>
  );
}
