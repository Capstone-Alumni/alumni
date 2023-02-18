'use client';

import { Button, Grid, Tab, Tabs, useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import usePublicGetEventById from '../hooks/usePublicGetEventById';
import Image from 'next/image';
import usePublicJoinEventById from '../hooks/usePublicJoinEventById';
import EventParticipantListTab from './EventParticipantListTab';

const EventDetailPage = () => {
  const [tabKey, setTabKey] = useState('description');
  const theme = useTheme();
  const pathname = usePathname();

  const eventId = pathname?.split('/')[2] || '';

  const { data, fetchApi, isLoading } = usePublicGetEventById();
  const { fetchApi: joinEvent, isLoading: joiningEvent } =
    usePublicJoinEventById();

  useEffect(() => {
    fetchApi({ eventId: eventId });
  }, []);

  const eventStatus = useMemo(() => {
    if (!data?.data) {
      return 'not-open';
    }

    const { data: eventData } = data;

    if (new Date(eventData.registrationTime) > new Date()) {
      return 'not-open';
    }

    if (new Date(eventData.startTime) > new Date()) {
      return 'opened';
    }

    if (eventData.endTime && new Date(eventData.endTime) > new Date()) {
      return 'running';
    }

    if (!eventData.endTime && !eventData.isEnded) {
      return 'running';
    }

    return 'ended';
  }, [data?.data]);

  const onJoinEvent = async () => {
    await joinEvent({ eventId: eventId });
  };

  if (isLoading || !data?.data) {
    return <LoadingIndicator />;
  }

  const { data: eventData } = data;

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: theme.spacing(32),
          mb: 2,
        }}
      >
        <Image
          src="/side_background.png"
          alt="event-image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Typography variant="h3" sx={{ mb: 1 }}>
        {eventData.title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(2),
          mb: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Typography>Người tổ chức</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{eventData.hostInformation?.fullName}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{eventData.hostInformation?.email}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Hình thức</Typography>
            </Grid>
            <Grid item xs={9}>
              {eventData.isOffline ? (
                <Typography
                  component="span"
                  fontWeight={600}
                  sx={{ color: theme.palette.warning.main }}
                >
                  Offline
                </Typography>
              ) : (
                <Typography
                  component="span"
                  fontWeight={600}
                  sx={{ color: theme.palette.success.main }}
                >
                  Online
                </Typography>
              )}
            </Grid>

            <Grid item xs={3}>
              <Typography>Tình trạng</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{eventStatus}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Mở đăng ký</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {new Date(eventData.registrationTime).toDateString()}
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Bắt đâu diễn ra</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {new Date(eventData.startTime).toDateString()}
              </Typography>
            </Grid>

            {eventData?.endTime ? (
              <>
                <Grid item xs={3}>
                  <Typography>Kết thúc</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>
                    {new Date(eventData.endTime).toDateString()}
                  </Typography>
                </Grid>
              </>
            ) : null}
          </Grid>
        </Box>

        <Box>
          <Button
            fullWidth
            variant="contained"
            disabled={
              eventStatus === 'not-open' ||
              eventStatus === 'ended' ||
              eventData.eventParticipants.length > 0 ||
              joiningEvent
            }
            startIcon={<AppRegistrationIcon />}
            sx={{ mb: 1 }}
            onClick={onJoinEvent}
          >
            {eventData.eventParticipants.length > 0
              ? 'Đã tham gia'
              : 'Tham gia'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<BookmarkBorderIcon />}
          >
            Quan tâm
          </Button>
        </Box>
      </Box>

      <Tabs
        value={tabKey}
        onChange={(_, key) => setTabKey(key)}
        aria-label="wrapped tabs"
      >
        <Tab value="description" label="Mô tả" />
        {eventData?.publicParticipant ? (
          <Tab value="participant" label="Người tham dự" />
        ) : null}
      </Tabs>

      {tabKey === 'description' ? (
        <Box>
          <Typography>{eventData?.description}</Typography>
        </Box>
      ) : null}

      {tabKey === 'participant' ? <EventParticipantListTab /> : null}
    </Box>
  );
};

export default EventDetailPage;
