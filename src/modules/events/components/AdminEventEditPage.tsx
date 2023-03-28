'use client';

import { Box, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import useOwnerGetEventById from '../hooks/useOwnerGetEventById';
import useOwnerUpdateEventById from '../hooks/useOwnerUpdateEventById';
import EventForm, { EventFormValues } from './EventForm';

const AdminEventEditPage = () => {
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
      <Typography variant="h6" sx={{ mb: 2 }}>
        Chỉnh sửa sự kiện
      </Typography>
      <EventForm initialData={data?.data} onSubmit={onUpdateEvent} />
    </Box>
  );
};

export default AdminEventEditPage;
