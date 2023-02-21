'use client';
import { Box, Pagination, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useState } from 'react';
import { useGetNewsForPublicQuery } from 'src/redux/slices/newsSlice';
import PublicNewsCardItems from './PublicNewsCardItem';

const PublicNewsPage = () => {
  const newestNewsParams = {
    page: 1,
    limit: 6,
    title: '',
    content: '',
  };

  const { data: newestNews, isLoading } = useGetNewsForPublicQuery({
    params: newestNewsParams,
  });

  const [olerNewsParams, setOlderNewsParams] = useState({
    page: 3,
    limit: 3,
    title: '',
    content: '',
  });

  const { data: olderNews } = useGetNewsForPublicQuery({
    params: olerNewsParams,
  });

  const onChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setOlderNewsParams({
      ...olerNewsParams,
      page: value + 2,
    });
  };
  return (
    <>
      {isLoading ? <LoadingIndicator /> : null}
      {newestNews ? (
        <>
          <Box
            sx={{
              width: '80%',
              margin: 'auto',
            }}
          >
            {newestNews.data.totalItems > 0 ? (
              <>
                <Typography
                  variant="h3"
                  sx={{
                    marginTop: 4,
                    fontFamily: 'Poppins-SVN,sans-serif',
                  }}
                >
                  Mới <br /> nhất
                </Typography>
                <Box
                  className="first-two-news"
                  sx={{
                    display: 'flex',
                    gap: '16px',
                    marginTop: 4,
                  }}
                >
                  {newestNews.data.items.slice(0, 2).map((item: any) => (
                    <PublicNewsCardItems
                      key={item.id}
                      item={item}
                      sx={{
                        width: '45%',
                        height: '250px',
                        imgWidth: 500,
                        imgHeight: 250,
                        typoVariant: 'h5',
                        marginImg: 2,
                      }}
                    />
                  ))}
                </Box>
                <Box
                  className="next-four-news"
                  sx={{
                    display: 'flex',
                    gap: '40px',
                    marginTop: 4,
                  }}
                >
                  {newestNews.data.items.slice(2, 6).map((item: any) => (
                    <PublicNewsCardItems
                      key={item.id}
                      item={item}
                      sx={{
                        width: '20%',
                        height: '150px',
                        imgWidth: 250,
                        imgHeight: 150,
                        typoVariant: 'h6',
                        marginImg: 2,
                      }}
                    />
                  ))}
                </Box>
              </>
            ) : (
              <Typography textAlign="center" variant="h6">
                Hiện tại chưa có tin tức nào
              </Typography>
            )}
          </Box>
          {olderNews && olderNews.data.items.length > 0 ? (
            <Box
              sx={{
                width: '80%',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  marginTop: 4,
                  fontFamily: 'Poppins-SVN,sans-serif',
                }}
              >
                Những tin cũ hơn
              </Typography>
              <>
                <Box
                  className="older-news"
                  sx={{
                    display: 'flex',
                    gap: '60px',
                    marginTop: 4,
                    height: '250px',
                    marginBottom: 4,
                  }}
                >
                  {olderNews.data.items.map((item: any) => (
                    <PublicNewsCardItems
                      key={item.id}
                      item={item}
                      sx={{
                        width: '25%',
                        height: '150px',
                        imgWidth: 350,
                        imgHeight: 150,
                        typoVariant: 'h6',
                        marginImg: 2,
                      }}
                    />
                  ))}
                </Box>
                <Pagination
                  page={olerNewsParams.page - 2}
                  sx={{
                    margin: 'auto',
                  }}
                  count={Math.ceil(
                    (olderNews.data.totalItems - 6) /
                      olderNews.data.itemPerPage,
                  )}
                  onChange={onChangePage}
                />
              </>
            </Box>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default PublicNewsPage;
