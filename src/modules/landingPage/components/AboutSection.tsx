'use client';

import { CardMedia } from '@mui/material';
import { Box, Card, Container, Typography, useTheme } from '@mui/material';
import { Tenant } from '@redux/slices/currentTenantSlice';

const AboutSection = ({ tenant }: { tenant: Tenant }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingX: theme.spacing(2),
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(10),
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing(2),
            margin: 'auto',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: theme.spacing(4),
            }}
          >
            <Box sx={{ maxWidth: '40vw' }}>
              <Typography variant="h3" sx={{ mb: theme.spacing(2) }}>
                {tenant.name}
              </Typography>

              <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                {tenant.description}
              </Typography>
            </Box>

            <Card raised>
              <CardMedia
                title="about-landing-page"
                component="div"
                sx={{
                  height: theme.spacing(70),
                  width: theme.spacing(55),
                  backgroundImage: `url(${
                    tenant.background2 ?? '/side_background.png'
                  })`,
                }}
              />
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSection;
