'use client';

import {
  alpha,
  Box,
  BoxProps,
  Button,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import useGetAccessStatus from '@share/hooks/useGetAccessStatus';
import Link from '@share/components/NextLinkV2';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';

const Body = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: BoxProps;
}) => {
  const theme = useTheme();
  const pathname = usePathname();

  const { data } = useGetAccessStatus();

  const message = useMemo(() => {
    if (!data?.data) {
      return null;
    }
    if (!data.data.accessRequest) {
      return 'Hãy tìm lớp của bạn để mở nhiều chức năng hơn';
    }
    if (data.data.accessStatus === 'PENDING') {
      return 'Yêu cầu tham gia lớp của bạn đã được ghi nhận, hãy đợi đại diện lớp của bạn duyệt yêu cầu nhé';
    }
    return null;
  }, [data]);

  return (
    <Container
      sx={{
        minHeight: '100vh',
        paddingTop: theme.spacing(10),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(4),
        ...sx,
      }}
    >
      {message && !pathname?.startsWith('/verify_account') ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingY: 2,
            paddingX: 4,
            mb: 4,
            borderRadius: `${theme.shape.borderRadiusSm}px`,
            backgroundColor: alpha(theme.palette.primary.lighter, 0.7),
          }}
        >
          <InfoIcon sx={{ mr: 1 }} />

          <Typography>{message}</Typography>

          <Box sx={{ flex: 1 }} />

          {message === 'Hãy tìm lớp của bạn để mở nhiều chức năng hơn' ? (
            <Link href="/verify_account">
              <Button variant="text">Tìm lớp ngay</Button>
            </Link>
          ) : null}
        </Box>
      ) : null}

      {children}
    </Container>
  );
};

export default Body;
