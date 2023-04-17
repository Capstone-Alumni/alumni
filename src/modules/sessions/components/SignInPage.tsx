'use client';

import { Box, Grid, useTheme } from '@mui/material';
import { BrowserView, MobileView } from 'react-device-detect';
import SignInForm from './SignInForm';
import { useRecoilValue } from 'recoil';
import { currentTenantDataAtom } from '@share/states';

const SignInPage = () => {
  const theme = useTheme();
  const { background3 } = useRecoilValue(currentTenantDataAtom);

  return (
    <Box
      sx={{
        paddingTop: theme.spacing(8),
      }}
    >
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
              backgroundImage: `url(${
                background3 ? background3 : '/side_background.png'
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            xs={6}
          />
        </Grid>
      </BrowserView>
    </Box>
  );
};

export default SignInPage;
