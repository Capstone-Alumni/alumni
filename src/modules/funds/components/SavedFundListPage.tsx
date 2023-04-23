'use client';

import { Button, Grid, IconButton, Pagination, useTheme } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from '@share/components/NextLinkV2';
import { useRecoilState } from 'recoil';
import useOwnerGetSavedFundList from '../hooks/useOwnerGetSavedFundList';
import usePublicUnSavedFundById from '../hooks/usePublicUnsaveFundById';
import { getOwnerSavedFundListParamsAtom } from '../states';
import EventCardItem from './FundCardItem';
import SearchInput from '@share/components/SearchInput';
import { useState } from 'react';

const SavedFundListPage = () => {
  const [search, setSearch] = useState('');

  const theme = useTheme();
  const [params, setParams] = useRecoilState(getOwnerSavedFundListParamsAtom);
  const { data, reload, isLoading } = useOwnerGetSavedFundList();
  const { fetchApi: unSavedFund } = usePublicUnSavedFundById();

  const onUnSavedFund = async (id: string) => {
    await unSavedFund({ fundId: id });
    reload();
  };

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

      {isLoading ? (
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
            {data?.data.items.map(item => (
              <EventCardItem
                key={item.id}
                data={item}
                actions={[
                  <Link
                    key="edit-btn"
                    href={`/funds/${item.id}`}
                    style={{ width: '100%', marginRight: theme.spacing(1) }}
                  >
                    <Button fullWidth variant="outlined">
                      Xem chi tiết
                    </Button>
                  </Link>,
                  <IconButton
                    key="save-btn"
                    color="warning"
                    onClick={() => onUnSavedFund(item.id)}
                  >
                    <BookmarkIcon />
                  </IconButton>,
                ]}
              />
            ))}
          </Grid>
          <Pagination
            sx={{
              margin: 'auto',
              display: 'flex',
              justifyContent: 'center',
            }}
            color="primary"
            count={Math.ceil(data?.data.totalItems / data?.data.itemPerPage)}
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

export default SavedFundListPage;
