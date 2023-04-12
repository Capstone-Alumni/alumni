'use client';
import { Box, Button, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import SearchInput from '@share/components/SearchInput';
import { useState } from 'react';
import { useGetNewsForPublicQuery } from 'src/redux/slices/newsSlice';
import PublicLatestNewsPage from './PublicLatestNewsPage';
import PublicOlderNewsPage from './PublicOlderNewsPage';
import PublicSearchNewsResult from './PublicSearchNewsResult';

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

  const [olderNewsParams, setOlderNewsParams] = useState({
    page: 3,
    limit: 3,
    title: '',
    content: '',
  });

  const { data: olderNews } = useGetNewsForPublicQuery({
    params: olderNewsParams,
  });

  const onChangePage = (value: number) => {
    setOlderNewsParams({
      ...olderNewsParams,
      page: value + 2,
    });
  };

  const [titleSearch, setTitleSearch] = useState('');

  const [searchNewsParams, setSearchNewsParams] = useState({
    page: 1,
    limit: 4,
    title: '',
    content: '',
  });

  const { data: searchNewsResult, isSuccess: isGettingResultSuccess } =
    useGetNewsForPublicQuery({
      params: searchNewsParams,
    });
  const [showSearchResult, setShowSearchResult] = useState(false);
  const handleSearchNews = () => {
    setSearchNewsParams({
      ...searchNewsParams,
      title: titleSearch,
    });
    if (titleSearch && isGettingResultSuccess) {
      setShowSearchResult(true);
    } else {
      setShowSearchResult(false);
    }
  };

  const handleChangeSearchPage = (value: number) => {
    setSearchNewsParams({
      ...searchNewsParams,
      page: value,
    });
  };

  const onPressSearchNews = (e: any) => {
    if (e.key === 'Enter') {
      handleSearchNews();
    }
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
            <Box
              sx={{
                display: 'flex',
              }}
            >
              {showSearchResult ? (
                <Button onClick={() => setShowSearchResult(false)}>
                  {' '}
                  Quay lại tin tức
                </Button>
              ) : null}
              {newestNews.data.totalItems > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    width: '40%',
                    marginLeft: 'auto',
                  }}
                >
                  <SearchInput
                    placeholder="Tìm kiếm tin tức"
                    onKeyDown={(event) => onPressSearchNews(event)}
                    value={titleSearch}
                    onChange={(event) => {
                      setTitleSearch(event.target.value);
                    }}
                  />
                  <Button
                    sx={{
                      ml: 1,
                      borderRadius: 2,
                    }}
                    size="small"
                    variant="outlined"
                    onClick={handleSearchNews}
                  >
                    Tìm
                  </Button>
                </Box>
              ) : null}
            </Box>
            {showSearchResult ? (
              <PublicSearchNewsResult
                newsList={searchNewsResult.data.items}
                itemPerPage={searchNewsResult.data.itemPerPage}
                totalItems={searchNewsResult.data.totalItems}
                searchNewsParams={searchNewsParams}
                onChangeSearchPage={handleChangeSearchPage}
              />
            ) : (
              <>
                {newestNews.data.totalItems > 0 ? (
                  <PublicLatestNewsPage newsList={newestNews.data.items} />
                ) : (
                  <Typography textAlign="center" variant="h6">
                    Hiện tại chưa có tin tức nào
                  </Typography>
                )}
              </>
            )}
          </Box>
          {!showSearchResult && olderNews && olderNews.data.items.length > 0 ? (
            <PublicOlderNewsPage
              newsList={olderNews.data.items}
              itemPerPage={olderNews.data.itemPerPage}
              totalItems={olderNews.data.totalItems}
              olderNewsParams={olderNewsParams}
              onChangePage={onChangePage}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default PublicNewsPage;
