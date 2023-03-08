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
import { Tenant } from '@share/states';
import Link from 'next/link';

const ClassSection = ({ tenant }: { tenant: Tenant }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingX: theme.spacing(2),
        background: `linear-gradient(38deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.lighter} 35%, ${theme.palette.common.white} 100%);`,
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
              justifyContent: 'space-around',
              gap: theme.spacing(3),
            }}
          >
            <Card raised>
              <CardMedia
                title="class-landing-page"
                component="div"
                sx={{
                  height: theme.spacing(70),
                  width: theme.spacing(55),
                  backgroundImage: `url(${
                    tenant.background3 ?? '/landing-page-class.png'
                  })`,
                }}
              />
            </Card>

            <Box
              sx={{
                maxWidth: '30rem',
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(2),
                alignItems: 'flex-end',
              }}
            >
              <Typography variant="h2" color="primary">
                Lớp học
              </Typography>

              <Typography>
                Tìm kiếm và theo dõi hoạt động của bạn bè và lớp học của bạn
              </Typography>

              <Link
                href="/sign_in"
                style={{ textDecoration: 'none', textUnderlineOffset: 0 }}
                prefetch={false}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{ borderRadius: '1.5rem' }}
                >
                  Tìm lớp ngay
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ClassSection;
