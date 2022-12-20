'use client';

import { Box, Grid } from '@mui/material';
import { BrowserView, MobileView } from 'react-device-detect';
import SignInForm from './SignInForm';

const SignInPage = () => {
  return (
    <>
      <MobileView>
        <Box>
          <SignInForm />
        </Box>
      </MobileView>
      <BrowserView>
        <Grid container sx={{ minHeight: '100vh' }}>
          <Grid item xs={6}>
            <SignInForm />
          </Grid>
          <Grid
            item
            sx={{
              backgroundImage: "url('/side_background.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            xs={6}
          />
        </Grid>
      </BrowserView>
    </>
  );
};

export default SignInPage;
