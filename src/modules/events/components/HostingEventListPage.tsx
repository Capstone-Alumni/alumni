'use client';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Grid, IconButton, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from '@share/components/NextLinkV2';
import { useRecoilState } from 'recoil';
import useOwnerDeleteEventById from '../hooks/useOwnerDeleteEventById';
import useOwnerGetEventList from '../hooks/useOwnerGetEventList';
import { getOwnerEventListParamsAtom } from '../states';
import EventCardItem from './EventCardItem';

const HostingEventListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getOwnerEventListParamsAtom);
  const { data, reload, isLoading } = useOwnerGetEventList();
  const { fetchApi: deleteEvent, isLoading: isDeleting } =
    useOwnerDeleteEventById();

  const onDeleteEvent = async (id: string) => {
    await deleteEvent({ eventId: id });
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
            showStatus={true}
            actions={[
              <Link
                key="edit-btn"
                href={`/events/hosting/${item.id}`}
                style={{ width: '100%' }}
                prefetch={false}
              >
                <Button fullWidth variant="outlined">
                  Chỉnh sửa
                </Button>
              </Link>,
              <IconButton
                key="delete-btn"
                color="error"
                disabled={isDeleting}
                onClick={() => onDeleteEvent(item.id)}
              >
                <DeleteOutlineIcon />
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

export default HostingEventListPage;
