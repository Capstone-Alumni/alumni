'use client';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Grid, IconButton, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useRecoilState } from 'recoil';
import usePublicGetEventList from '../hooks/usePublicGetEventList';
import { getPublicEventListParamsAtom } from '../states';
import EventCardItem from './EventCardItem';
import usePublicInterestEventById from '../hooks/usePublicInterestEventById';
import usePublicUninterestEventById from '../hooks/usePublicUninterestEventById';
import SearchInput from '@share/components/SearchInput';
import { useState } from 'react';

const DiscoverEventListPage = () => {
  const [search, setSearch] = useState('');

  const theme = useTheme();
  const [params, setParams] = useRecoilState(getPublicEventListParamsAtom);
  const { data, reload, isLoading } = usePublicGetEventList();
  const { fetchApi: interestEvent, isLoading: isInterestingEvent } =
    usePublicInterestEventById();
  const { fetchApi: uninterestEvent, isLoading: isUninterestingEvent } =
    usePublicUninterestEventById();

  const onInterestEvent = async (eventId: string) => {
    await interestEvent({ eventId: eventId });
    reload();
  };

  const onUninterestEvent = async (eventId: string) => {
    await uninterestEvent({ eventId: eventId });
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
              const isInterested = item.eventInterests.length > 0;

              return (
                <EventCardItem
                  key={item.id}
                  data={item}
                  actions={[
                    isInterested ? (
                      <IconButton
                        key="unsave-btn"
                        color="warning"
                        disabled={isUninterestingEvent}
                        onClick={() => onUninterestEvent(item.id)}
                      >
                        <BookmarkIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        key="save-btn"
                        disabled={isInterestingEvent}
                        onClick={() => onInterestEvent(item.id)}
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

export default DiscoverEventListPage;
