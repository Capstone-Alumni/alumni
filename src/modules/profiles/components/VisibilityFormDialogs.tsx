import { useState } from 'react';
// material
import { Box, Button, Dialog } from '@mui/material';
import EditVisibilityForm from '@share/components/_dashboard/user/profile/EditVisibilityForm';
import { ScopePublicity } from '@prisma/client';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { mappingScopPublicity } from 'src/utils/mappingPublicity';
import { useCanEditProfile } from '../helpers/canEditProfile';
import { useGetUserInformationQuery } from '@redux/slices/userProfileSlice';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ----------------------------------------------------------------------
interface FormDialogsProps {
  buttonContent?: string;
  children?: React.ReactNode;
  editType?: string;
  name: string;
}

export default function VisibilityFormDialogs({
  buttonContent = 'DEFAULT',
  children,
  editType,
  name,
}: FormDialogsProps) {
  const [open, setOpen] = useState(false);
  const { userProfileId } = useCanEditProfile();
  const userInformationResponse = useGetUserInformationQuery(userProfileId);
  const userInformation = userInformationResponse?.data?.data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRenderIcon = (scope: string) => {
    switch (scope) {
      case 'Chỉ mình tôi':
        return <LockIcon />;
      case 'Lớp':
        return <GroupIcon />;
      case 'Khoá':
        return <GroupsIcon />;
      case 'Trường':
        return <PublicIcon />;
      default:
        return <VisibilityIcon />;
    }
  };

  return (
    <div>
      {children ? (
        <Box onClick={handleClickOpen}>
          <Tooltip
            title={
              name && userInformation
                ? mappingScopPublicity[
                    userInformation.information[name] as ScopePublicity
                  ]
                : 'Tuỷ chỉnh quyền riêng tư'
            }
          >
            <IconButton sx={{ height: '24px', width: '24px' }}>
              {handleRenderIcon(
                mappingScopPublicity[
                  userInformation?.information[name] as ScopePublicity
                ],
              )}
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
            userInformation={userInformation?.information}
            name={name}
          />
        )}
      </Dialog>
    </div>
  );
}
