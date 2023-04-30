import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import FormDialogs from '@share/components/material-ui/dialog/FormDialogs';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ProfileInfoRow = ({
  title,
  content,
  userInformationData,
  isPrivacy = false,
  isAllowToView = false,
  name,
}: any) => {
  const theme = useTheme();

  return (
    <Grid container style={{ marginBottom: theme.spacing(1) }}>
      <Grid
        item
        xs={4}
        style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}
      >
        <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
      </Grid>
      <Grid
        item
        xs={8}
        style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}
      >
        <Box
          sx={{
            maxWidth: `${isPrivacy ? '2000px' : '300px'}`,
            width: `${isPrivacy ? '200px' : '300px'}`,
          }}
        >
          <Typography sx={{ whiteSpace: 'initial', wordWrap: 'break-word' }}>
            {content ? content : 'Chưa cập nhập'}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ flex: 1 }} />
        {isPrivacy && isAllowToView && (
          <Box
            sx={{
              marginRight: 1,
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <FormDialogs
              name={name as string}
              userInformation={userInformationData}
              editType="visibility"
            >
              <IconButton>
                <VisibilityIcon />
              </IconButton>
            </FormDialogs>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileInfoRow;
