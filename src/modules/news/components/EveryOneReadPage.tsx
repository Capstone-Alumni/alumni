'use client';
import { Box, Typography } from '@mui/material';
import { useGetNewsForPublicQuery } from '@redux/slices/newsSlice';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NewsCard from 'src/modules/landingPage/components/NewsCard';
import { News } from '../types';

const EveryOneReadPage = () => {
  const pathname = usePathname();
  const currentNewsId = pathname?.split('/')[2];
  const [newsListExceptCurrentNews, setNewsListExceptCurrentNews] = useState(
    [],
  );

  const { data: newsList, isLoading } = useGetNewsForPublicQuery({
    params: {
      page: 1,
      limit: 6,
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (newsList) {
      const listExceptCurrentNews = newsList.data.items.filter(
        (item: News) => item.id !== currentNewsId,
      );
      setNewsListExceptCurrentNews(listExceptCurrentNews);
    }
  }, [newsList]);

  return (
    <>
      {isLoading ? <LoadingIndicator /> : null}
      {newsList ? (
        <Box
          sx={{
            marginTop: 3,
          }}
        >
          {newsListExceptCurrentNews.length > 0 ? (
            <>
              <Typography
                sx={{
                  marginBottom: 3,
                }}
                variant="h3"
              >
                Có thể bạn quan tâm
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                }}
              >
                {newsListExceptCurrentNews.slice(0, 3).map((item: News) => (
                  <NewsCard
                    key={item.id}
                    item={item}
                    sx={{
                      width: '100%',
                      height: '100px',
                      imgWidth: 600,
                      imgHeight: 100,
                      typoVariant: 'h5',
                      marginImg: 2,
                    }}
                  />
                ))}
              </Box>
            </>
          ) : null}
        </Box>
      ) : null}
    </>
  );
};

export default EveryOneReadPage;
