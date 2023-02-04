'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import Logo from '../Logo';

const Footer = ({ tenant }: { tenant?: any }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.neutral,
      }}
    >
      <Container
        sx={{
          // position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
          paddingY: theme.spacing(4),
        }}
      >
        {/* <Box
          sx={{
            position: 'absolute',
            top: -30,
            left: -30,
            zIndex: 0,
            width: 300,
            height: 330,
            clipPath: 'polygon(55% 2%, 89% 53%, 48% 100%, 6% 100%, 17% 25%)',
            backgroundColor: theme.palette.primary.lighter,
          }}
        /> */}
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
              <Logo sx={{ zIndex: 1 }} />
              <Typography variant="h6">{tenant?.name}</Typography>
            </Box>
            {/* <Typography color="GrayText" variant="body2" gutterBottom>
              Lô E2a7, đường D1, khu công nghệ cao, Quận 9, Thành phố Thủ Đức Lô
              E2a7, đường D1, khu công nghệ cao, Quận 9, Thành phố Thủ Đức Lô
              E2a7, đường D1, khu công nghệ ca
            </Typography> */}
            {/* <Box>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<FacebookIcon />}
              >
                Facebook
              </Button>
            </Box> */}
          </Box>

          <Box sx={{ textAlign: 'right', maxWidth: '20rem' }}>
            <Typography variant="h6">Địa chỉ</Typography>
            <Typography color="GrayText" variant="body2" gutterBottom>
              Lô E2a7, đường D1, khu công nghệ cao, Quận 9
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
