'use client';

import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const AboutSection = ({ tenant }: { tenant: any }) => {
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

            <Box>
              <Image
                height={620}
                width={480}
                alt="tenant-background"
                src="/side_background.png"
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSection;
