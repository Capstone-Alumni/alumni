'use client';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button, Grid, IconButton, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import usePublicGetFundList from '../hooks/usePublicGetFundList';
import { getOwnerFundListParamsAtom } from '../states';
import FundCardItem from './FundCardItem';
import usePublicInterestFundById from '../hooks/usePublicSaveFundById';
import usePublicUninterestFundById from '../hooks/usePublicUnsaveFundById';

const DiscoverFundListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getOwnerFundListParamsAtom);
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

  if (isLoading && !data?.data) {
    return <LoadingIndicator />;
  }

  return (
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
                >
                  <Button fullWidth variant="outlined">
                    Tìm hiểu thêm
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
  );
};

export default DiscoverFundListPage;
