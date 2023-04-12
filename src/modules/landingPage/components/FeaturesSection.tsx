'use client';

import { Container, Stack, styled, Typography } from '@mui/material';
import Image from 'next/image';
import Link from '@share/components/NextLinkV2';
import useGetAccessStatus from '@share/hooks/useGetAccessStatus';
import React, { useMemo } from 'react';
import SectionTemplate from './SectionTemplate';

const StyledBox = styled('div')(({ theme }) => ({
  minWidth: '250px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.primary.light,
  borderStyle: 'solid',
  borderWidth: '1px',
  boxShadow: theme.shadows[4],

  '&:hover': {
    boxShadow: theme.shadows[10],
  },
}));

const FeaturesSection = () => {
  const { data } = useGetAccessStatus();

  const isVerified = useMemo(() => {
    if (!data?.data) {
      return false;
    }
    if (!data.data.accessRequest) {
      return false;
    }
    if (data.data.accessStatus === 'PENDING') {
      return false;
    }
    return true;
  }, [data]);

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {isVerified ? (
        <SectionTemplate
          headerContent={
            <Typography color="primary" variant="h3">
              Chuyên mục nổi bật
            </Typography>
          }
          switchSvg
        >
          <Stack
            direction={{ sm: 'column', md: 'row' }}
            gap={3}
            justifyContent="center"
            alignItems="center"
          >
            <Link
              href="/events/discover"
              style={{ textDecoration: 'none', textUnderlineOffset: 0 }}
            >
              <StyledBox>
                <Image src="/event.svg" alt="event" width={200} height={200} />
                <Typography variant="h4">Sự kiện</Typography>
              </StyledBox>
            </Link>
            <Link
              href="/funds/going"
              style={{ textDecoration: 'none', textUnderlineOffset: 0 }}
            >
              <StyledBox>
                <Image src="/fund.svg" alt="fund" width={200} height={200} />
                <Typography variant="h4">Gây quỹ</Typography>
              </StyledBox>
            </Link>
            <Link
              href="/recruitments/discover"
              style={{ textDecoration: 'none', textUnderlineOffset: 0 }}
            >
              <StyledBox>
                <Image
                  src="/recruite.svg"
                  alt="recruite"
                  width={200}
                  height={200}
                />
                <Typography variant="h4">Tuyển dụng</Typography>
              </StyledBox>
            </Link>
            <Link
              href="/posts"
              style={{ textDecoration: 'none', textUnderlineOffset: 0 }}
            >
              <StyledBox>
                <Image src="/post.svg" alt="post" width={200} height={200} />
                <Typography variant="h4">Bài đăng</Typography>
              </StyledBox>
            </Link>
          </Stack>
        </SectionTemplate>
      ) : (
        <SectionTemplate onlyFooter>
          <Typography variant="h4" textAlign="center" sx={{ mb: 2, mt: 8 }}>
            Hãy <Link href="/verify_account">xác thực</Link> tài khoản để sử
            dụng nhiều tín năng hơn
          </Typography>
          <Stack
            direction={{ sm: 'column', md: 'row' }}
            gap={3}
            justifyContent="center"
            alignItems="center"
          >
            <StyledBox>
              <Image src="/event.svg" alt="event" width={200} height={200} />
              <Typography variant="h4">Sự kiện</Typography>
            </StyledBox>
            <StyledBox>
              <Image src="/fund.svg" alt="fund" width={200} height={200} />
              <Typography variant="h4">Gây quỹ</Typography>
            </StyledBox>
            <StyledBox>
              <Image
                src="/recruite.svg"
                alt="recruite"
                width={200}
                height={200}
              />
              <Typography variant="h4">Tuyển dụng</Typography>
            </StyledBox>
            <StyledBox>
              <Image src="/post.svg" alt="post" width={200} height={200} />
              <Typography variant="h4">Bài đăng</Typography>
            </StyledBox>
          </Stack>
        </SectionTemplate>
      )}
    </Container>
  );
};

export default React.memo(FeaturesSection);
