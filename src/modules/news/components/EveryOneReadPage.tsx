'use client';
import { Box, Card, Link, Typography } from '@mui/material';
import { useGetNewsForPublicQuery } from '@redux/slices/newsSlice';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { getImageOfNews } from '@share/utils/getFirstImageOfNews';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
        <Box>
          <Typography variant="h3">Có thể bạn quan tâm</Typography>
          {newsListExceptCurrentNews.map((row: News, index: number) => (
            <Card
              sx={{
                display: 'flex',
                marginTop: 3,
              }}
              key={row.id}
            >
              <Typography
                sx={{
                  color: '#bfbfbf',
                  fontFamily: 'Merriweather',
                  fontSize: '56px',
                  fontWeight: 600,
                  marginRight: '32px',
                  width: '40px',
                  marginLeft: 0.5,
                }}
              >
                {index + 1}
              </Typography>
              <Box
                sx={{
                  height: 150,
                  padding: 2,
                  display: 'flex',
                }}
              >
                <Box
                  sx={{
                    width: 200,
                    height: 100,
                    backgroundImage: `url(${
                      row.newsImageUrl
                        ? row.newsImageUrl
                        : getImageOfNews(row.content)
                    })`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    margin: 'auto',
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '20px',
                    fontWeight: 600,
                    paddingLeft: 3,
                    cursor: 'pointer',
                  }}
                >
                  <Link
                    href={`/news/${row.id}`}
                    sx={{
                      color: 'black',
                      textDecoration: 'none',
                    }}
                  >
                    {row.title}
                  </Link>
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      ) : null}
    </>
  );
};

export default EveryOneReadPage;
