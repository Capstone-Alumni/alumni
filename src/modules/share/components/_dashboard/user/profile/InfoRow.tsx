import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';

const ProfileInfoRow = ({ title, content }: any) => {
  const theme = useTheme();
  
  return (
    <Grid container style={{ marginBottom: theme.spacing(1) }}>
      <Grid item xs={4} style={{ textAlign: 'left' }}>
        <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
      </Grid>
      <Grid item xs={8} style={{ textAlign: 'left' }}>
        <Typography>{content ? content : 'Chưa cập nhập'}</Typography>
      </Grid>
    </Grid>
  );
}

export default ProfileInfoRow;
