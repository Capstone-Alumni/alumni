'use client';

import { Grid } from '@mui/material';
import { Button, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import SearchInput from '@share/components/SearchInput';
import Link from '@share/components/NextLinkV2';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import useOwnerGetGoingEventList from '../hooks/useOwnerGetGoingEventList';
import { getOwnerGoingEventListParamsAtom } from '../states';
import EventCardItem from './EventCardItem';

const GoingEventListPage = () => {
  const [search, setSearch] = useState('');

  const theme = useTheme();
  const [params, setParams] = useRecoilState(getOwnerGoingEventListParamsAtom);
  const { data, isLoading } = useOwnerGetGoingEventList();

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
            {data?.data.items.map(item => (
              <EventCardItem
                key={item.id}
                data={item}
                actions={[
                  <Link
                    key="edit-btn"
                    href={`/events/${item.id}`}
                    style={{ width: '100%' }}
                    prefetch={false}
                  >
                    <Button fullWidth variant="outlined">
                      Xem chi tiết
                    </Button>
                  </Link>,
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

export default GoingEventListPage;
