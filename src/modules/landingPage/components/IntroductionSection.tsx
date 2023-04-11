'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import { Tenant } from '@share/states';

const IntroductionSection = ({ tenant }: { tenant: Tenant }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingX: theme.spacing(2),
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${
          tenant?.background1 ?? '/side_background.png'
        })`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: 'yellow',
      }}
    >
      <Container
        sx={{
          minHeight: '80vh',
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
              color: theme.palette.primary.contrastText,
            }}
          >
            <Typography variant="h2">
              Mạng lưới cựu học sinh{' '}
              <Typography
                variant="h2"
                component="span"
                sx={{ color: theme.palette.primary.light }}
              >
                {tenant.name}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IntroductionSection;
