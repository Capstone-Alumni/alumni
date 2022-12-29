'use client';

import { Box, Grid } from '@mui/material';
import { ResetPasswordForm } from 'modules/share/components/authentication/reset-password';
import BadgeStatus from 'modules/share/components/BadgeStatus';
import MyAvatar from 'modules/share/components/MyAvatar';
import { BrowserView, MobileView } from 'react-device-detect';
import SignUpForm from './SignUpForm';

const SignInPage = () => {
  return (
    <>
      <MobileView>
        <Box>
          <SignUpForm />
        </Box>
      </MobileView>
      <BrowserView>
        <Grid container sx={{ minHeight: '100vh' }}>
          <Grid
            item
            sx={{
              backgroundImage: "url('/side_background_2.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            xs={6}
          />
          <Grid item xs={6}>
            <SignUpForm />
          </Grid>
        </Grid>
      </BrowserView>
    </>
  );
};

export default SignInPage;
