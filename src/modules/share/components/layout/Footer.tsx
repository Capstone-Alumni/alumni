'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import { Tenant } from '@share/states';
import Logo from '../Logo';

const Footer = ({ tenant }: { tenant?: Tenant }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.neutral,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
          paddingY: theme.spacing(4),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: theme.spacing(2),
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(2),
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: theme.spacing(1),
              }}
            >
              <Logo
                url={tenant?.logo}
                sx={{ zIndex: 1, borderRadius: '8px', overflow: 'hidden' }}
              />
              <Typography variant="h6" color="primary">
                {tenant?.name}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: 'right', maxWidth: '20rem' }}>
            <Typography variant="h6">Địa chỉ</Typography>
            <Typography color="GrayText" variant="body2" gutterBottom>
              {tenant?.address}
              <br />
              {tenant?.provinceName}
              <br />
              {tenant?.cityName}
            </Typography>
          </Box>
        </Box>

        <Typography color="GrayText" textAlign="center">
          Powered by{' '}
          <a href="https://demo-platform-sp23.vercel.app">Alumni Platform</a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
