'use client';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button, Grid, IconButton, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import usePublicGetEventList from '../hooks/usePublicGetEventList';
import { getOwnerEventListParamsAtom } from '../states';
import EventCardItem from './EventCardItem';
import usePublicInterestEventById from '../hooks/usePublicInterestEventById';
import usePublicUninterestEventById from '../hooks/usePublicUninterestEventById';

const DiscoverEventListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getOwnerEventListParamsAtom);
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
          const isJoined = item.eventParticipants.length > 0;
          const isInterested = item.eventInterests.length > 0;

          return (
            <EventCardItem
              key={item.id}
              data={item}
              actions={[
                <Link
                  key="edit-btn"
                  href={`/events/${item.id}`}
                  style={{ width: '100%', marginRight: theme.spacing(1) }}
                  prefetch={false}
                >
                  <Button fullWidth variant="outlined">
                    Tìm hiểu thêm
                  </Button>
                </Link>,
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
  );
};

export default DiscoverEventListPage;
