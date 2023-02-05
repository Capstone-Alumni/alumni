'use client';

import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from 'src/redux/hooks';
import { currentTenantSelector } from 'src/redux/slices/currentTenantSlice';

const IntroductionSection = ({ tenant }: { tenant: any }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingX: theme.spacing(2),
        backgroundImage: 'url("/side_background.png")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: 'yellow',
      }}
    >
      <Container
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
          paddingTop: theme.spacing(10),
        }}
      >
        <Box
          sx={{
            width: '40vw',
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(2),
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: theme.spacing(2),
            }}
          >
            <Typography variant="h2">
              Mạng lưới cựu học sinh{' '}
              <Typography variant="h2" color="primary" component="span">
                {tenant.name}
              </Typography>
            </Typography>
          </Box>

          <Typography fontSize={18}>{tenant.description}</Typography>

          {/* <Box>
            <Link
              href="/sign_in"
              style={{ textDecoration: 'none', textUnderlineOffset: 0 }}
            >
              <Button variant="contained" size="large">
                
              </Button>
            </Link>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
};

export default IntroductionSection;
