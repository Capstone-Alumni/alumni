'use client';

import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from 'next/link';
import { useGetNewsForPublicQuery } from 'src/redux/slices/newsSlice';
import NewsCard from './NewsCard';

const NewsSection = () => {
  const theme = useTheme();

  const { data: newsListData, isLoading } = useGetNewsForPublicQuery({
    params: {
      page: 1,
      limit: 3,
      title: '',
      content: '',
    },
  });

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
          <Typography variant="h2" color="primary" textAlign="center">
            Tin tức
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: theme.spacing(6),
            }}
          >
            {isLoading ? <LoadingIndicator /> : null}
            {newsListData?.data.items.map((item: any) => (
              <NewsCard
                key={item.id}
                item={item}
                sx={{
                  width: '45%',
                  height: '300px',
                  imgWidth: 500,
                  imgHeight: 300,
                  typoVariant: 'h5',
                  marginImg: 2,
                }}
              />
            ))}
          </Box>

          <Link
            href="/news"
            style={{ textDecoration: 'none', textUnderlineOffset: 0 }}
            prefetch={false}
          >
            <Button
              variant="contained"
              size="large"
              sx={{ borderRadius: '1.5rem' }}
            >
              Xem thêm
            </Button>
          </Link>

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

export default NewsSection;
