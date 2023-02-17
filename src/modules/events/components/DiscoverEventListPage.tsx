'use client';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box, Button, IconButton, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import usePublicGetEventList from '../hooks/usePublicGetEventList';
import { getOwnerEventListParamsAtom } from '../states';
import EventCardItem from './EventCardItem';

const DiscoverEventListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getOwnerEventListParamsAtom);
  const { data, reload, isLoading } = usePublicGetEventList();

  if (isLoading || !data?.data) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.spacing(2),
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
              >
                <Button fullWidth variant="outlined">
                  Tìm hiểu thêm
                </Button>
              </Link>,
              <IconButton key="save-btn">
                <BookmarkBorderIcon />
              </IconButton>,
            ]}
          />
        ))}
      </Box>
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

export default DiscoverEventListPage;
