'use client';

import { Box, Typography } from '@mui/material';
import useCreateEvent from '../hooks/useCreateEvent';
import EventForm, { EventFormValues } from './EventForm';

const CreateEventPage = () => {
  const { fetchApi } = useCreateEvent();

  const onCreateEvent = async (values: EventFormValues) => {
    await fetchApi(values);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tổ chức sự kiện
      </Typography>
      <EventForm onSubmit={onCreateEvent} />
    </Box>
  );
};

export default CreateEventPage;
