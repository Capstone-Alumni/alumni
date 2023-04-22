'use client';

import { Container, Stack, styled, Typography } from '@mui/material';
import Image from 'next/image';
import Link from '@share/components/NextLinkV2';
import React from 'react';
import SectionTemplate from './SectionTemplate';
import { useSession } from 'next-auth/react';

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
  const { data: session } = useSession();

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {session?.user ? (
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
            {session?.user ? (
              'Và nhiều tính năng hơn nữa'
            ) : (
              <>
                Hãy <Link href="/sign_in">đăng nhập</Link> để sử dụng nhiều tín
                năng hơn
              </>
            )}
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
