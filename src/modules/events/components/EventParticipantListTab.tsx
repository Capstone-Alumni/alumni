'use client';

import { Box, Pagination, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import usePublicGetEventParticipantList from '../hooks/usePublicGetEventParticipantList';
import { getPublicEventParticipantListParamsAtom } from '../states';
import MyAvatar from '@share/components/MyAvatar';

const EventParticipantListTab = () => {
  const pathname = usePathname();
  const eventId = pathname?.split('/')[2] || '';

  const [params, setParams] = useRecoilState(
    getPublicEventParticipantListParamsAtom,
  );
  const { data, isLoading } = usePublicGetEventParticipantList(eventId);

  if (isLoading || !data?.data) {
    return <LoadingIndicator />;
  }

  return (
    <Box
      sx={{
        py: 2,
        px: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 1,
          mb: 2,
        }}
      >
        {data.data.items.map(item => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MyAvatar />
            <Typography>{item.participantInformation.fullName}</Typography>
            {/* <Box>
            <Typography variant="body2">
              {item.participantInformation.email}
            </Typography>
          </Box> */}
          </Box>
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
    </Box>
  );
};

export default EventParticipantListTab;
