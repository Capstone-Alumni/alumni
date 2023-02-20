import { Box, Grid, Typography, useTheme } from '@mui/material';
import BasicSelect from '@share/components/Select';
import React from 'react';

const ProfileInfoRow = ({
  title,
  content,
  userInformationData,
  isPrivacy = false,
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
            maxWidth: `${isPrivacy ? '150px' : '300px'}`,
            width: `${isPrivacy ? '150px' : '300px'}`,
          }}
        >
          <Typography>{content ? content : 'Chưa cập nhập'}</Typography>
        </Box>
        {isPrivacy && (
          <Box sx={{ width: '150px', marginRight: '1rem' }}>
            <BasicSelect
              userId={userInformationData?.userId}
              name={name}
              value={userInformationData[name]}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileInfoRow;
