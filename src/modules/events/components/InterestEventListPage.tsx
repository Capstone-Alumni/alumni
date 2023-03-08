'use client';

import { Button, Grid, IconButton, Pagination, useTheme } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import useOwnerGetInterestEventList from '../hooks/useOwnerGetInterestEventList';
import usePublicUninterestEventById from '../hooks/usePublicUninterestEventById';
import { getOwnerInterestEventListParamsAtom } from '../states';
import EventCardItem from './EventCardItem';

const InterestEventListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(
    getOwnerInterestEventListParamsAtom,
  );
  const { data, reload, isLoading } = useOwnerGetInterestEventList();
  const { fetchApi: uninterestEvent } = usePublicUninterestEventById();

  const onUninterestEvent = async (id: string) => {
    await uninterestEvent({ eventId: id });
    reload();
  };

  if (isLoading || !data?.data) {
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
        {data?.data.items.map(item => (
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
                  Xem chi tiết
                </Button>
              </Link>,
              <IconButton
                key="save-btn"
                color="warning"
                onClick={() => onUninterestEvent(item.id)}
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
  );
};

export default InterestEventListPage;
