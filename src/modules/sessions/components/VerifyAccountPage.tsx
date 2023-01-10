'use client';

import { Box, Grid } from '@mui/material';
import { ResetPasswordForm } from 'src/modules/share/components/authentication/reset-password';
import BadgeStatus from 'src/modules/share/components/BadgeStatus';
import MyAvatar from 'src/modules/share/components/MyAvatar';
import { BrowserView, MobileView } from 'react-device-detect';
import SignUpForm from './SignUpForm';
import StepperComponent from '@share/components/material_ui/stepper';

const VerifyAccountPage = () => {
  return (
    <>
      {/* <MobileView>
        <Box>
          <SignUpForm />
        </Box>
      </MobileView>
      <BrowserView>
        <Grid container sx={{ minHeight: '100vh' }}>
          <h1>+vvvvv</h1>
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
      </BrowserView> */}
    <StepperComponent/>
    </>
  );
};

export default VerifyAccountPage;
