'use client';

import { Button, Stack, Tab, Tabs } from '@mui/material';
import { Box, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useOwnerGetEventById from '../hooks/useOwnerGetEventById';
import useOwnerUpdateEventById from '../hooks/useOwnerUpdateEventById';
import EventForm, { EventFormValues } from './EventForm';
// import EventParticipantListTab from './EventParticipantListTab';

const AdminEventEditPage = () => {
  const [tabKey, setTabKey] = useState('info');

  const router = useRouter();
  const pathname = usePathname();

  const eventId = pathname?.split('/')[4] || '';

  const { fetchApi: updateEvent, isLoading: isUpdating } =
    useOwnerUpdateEventById();
  const {
    fetchApi: getEvent,
    data,
    isLoading: isGettingEvent,
  } = useOwnerGetEventById();

  useEffect(() => {
    getEvent({ eventId: eventId });
  }, []);

  const onUpdateEvent = async (values: EventFormValues) => {
    await updateEvent({ eventId: data?.data.id || '', ...values });
  };

  if (isGettingEvent) {
    return <LoadingIndicator />;
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Chỉnh sửa thông tin sự kiện</Typography>
        <Button variant="text" onClick={() => router.back()}>
          quay lại
        </Button>
      </Stack>

      <Tabs
        value={tabKey}
        onChange={(_, key) => setTabKey(key)}
        aria-label="wrapped tabs"
      >
        <Tab value="info" label="Thông tin cơ bản" />
        {/* <Tab value="participant" label="Người tham gia" /> */}
      </Tabs>

      {tabKey === 'info' ? (
        <EventForm initialData={data?.data} onSubmit={onUpdateEvent} />
      ) : null}

      {/* {tabKey === 'participant' ? (
        <EventParticipantListTab eventId={eventId} />
      ) : null} */}
    </Box>
  );
};

export default AdminEventEditPage;
