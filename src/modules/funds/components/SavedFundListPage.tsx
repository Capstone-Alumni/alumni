'use client';

import { Box, Button, IconButton, Pagination, useTheme } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import useOwnerGetSavedFundList from '../hooks/useOwnerGetSavedFundList';
import usePublicUnSavedFundById from '../hooks/usePublicUnsaveFundById';
import { getOwnerSavedFundListParamsAtom } from '../states';
import EventCardItem from './FundCardItem';

const SavedFundListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getOwnerSavedFundListParamsAtom);
  const { data, reload, isLoading } = useOwnerGetSavedFundList();
  const { fetchApi: unSavedFund } = usePublicUnSavedFundById();

  const onUnSavedFund = async (id: string) => {
    await unSavedFund({ fundId: id });
    reload();
  };

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

export default SavedFundListPage;
