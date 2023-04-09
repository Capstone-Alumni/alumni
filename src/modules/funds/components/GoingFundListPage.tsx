'use client';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button, Grid, IconButton, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from '@share/components/NextLinkV2';
import { useRecoilState } from 'recoil';
import usePublicGetFundList from '../hooks/usePublicGetFundList';
import { getPublicFundListParamsAtom } from '../states';
import FundCardItem from './FundCardItem';
import usePublicInterestFundById from '../hooks/usePublicSaveFundById';
import usePublicUninterestFundById from '../hooks/usePublicUnsaveFundById';
import { useEffect, useState } from 'react';
import SearchInput from '@share/components/SearchInput';

const GogingFundListPage = () => {
  const [search, setSearch] = useState('');

  const theme = useTheme();
  const [params, setParams] = useRecoilState(getPublicFundListParamsAtom);
  const { data, reload, isLoading } = usePublicGetFundList();
  const { fetchApi: interestFund, isLoading: isInterestingFund } =
    usePublicInterestFundById();
  const { fetchApi: uninterestFund, isLoading: isUninterestingFund } =
    usePublicUninterestFundById();

  const onInterestFund = async (FundId: string) => {
    await interestFund({ fundId: FundId });
    reload();
  };

  const onUninterestFund = async (FundId: string) => {
    await uninterestFund({ fundId: FundId });
    reload();
  };

  useEffect(() => {
    setParams(prev => ({ ...prev, status: 'going' }));
  }, []);

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          setParams(prevParams => ({ ...prevParams, title: search }));
        }}
        style={{ marginBottom: theme.spacing(2) }}
      >
        <SearchInput value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>

      {isLoading && !data?.data ? (
        <LoadingIndicator />
      ) : (
        <>
          <Grid
            container
            spacing={2}
            sx={{
              mb: 2,
            }}
          >
            {data?.data.items.map(item => {
              const isSaved = item.fundSaved.length > 0;

              return (
                <FundCardItem
                  key={item.id}
                  data={item}
                  actions={[
                    <Link
                      key="edit-btn"
                      href={`/funds/${item.id}`}
                      style={{ width: '100%', marginRight: theme.spacing(1) }}
                      prefetch={false}
                    >
                      <Button fullWidth variant="outlined">
                        Ủng hộ
                      </Button>
                    </Link>,
                    isSaved ? (
                      <IconButton
                        key="unsave-btn"
                        color="warning"
                        disabled={isUninterestingFund}
                        onClick={() => onUninterestFund(item.id)}
                      >
                        <BookmarkIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        key="save-btn"
                        disabled={isInterestingFund}
                        onClick={() => onInterestFund(item.id)}
                      >
                        <BookmarkBorderIcon />
                      </IconButton>
                    ),
                  ]}
                />
              );
            })}
          </Grid>
          <Pagination
            sx={{
              margin: 'auto',
              display: 'flex',
              justifyContent: 'center',
            }}
            color="primary"
            count={Math.ceil(
              (data?.data.totalItems || 0) / (data?.data.itemPerPage || 1),
            )}
            page={params.page}
            onChange={(_, nextPage) => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        </>
      )}
    </>
  );
};

export default GogingFundListPage;
