'use client';

import { Button, Grid, Tab, Tabs, useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
// import usePublicGetEventById from '../hooks/usePublicGetEventById';
import Image from 'next/image';
// import usePublicJoinEventById from '../hooks/usePublicJoinEventById';
// import EventParticipantListTab from './EventParticipantListTab';
// import usePublicInterestEventById from '../hooks/usePublicInterestEventById';
// import usePublicUninterestEventById from '../hooks/usePublicUninterestEventById';

const EventDetailPage = () => {
  const [tabKey, setTabKey] = useState('description');
  const theme = useTheme();
  const pathname = usePathname();

  const eventId = pathname?.split('/')[2] || '';

  //   const { data, fetchApi, isLoading } = usePublicGetEventById();
  //   const { fetchApi: joinEvent, isLoading: joiningEvent } =
  //     usePublicJoinEventById();
  //   const { fetchApi: interestEvent, isLoading: isInterestingEvent } =
  //     usePublicInterestEventById();
  //   const { fetchApi: uninterestEvent, isLoading: isUninterestingEvent } =
  //     usePublicUninterestEventById();

  //   useEffect(() => {
  //     fetchApi({ eventId: eventId });
  //   }, []);

  //   const isInterested = useMemo(() => {
  //     return (
  //       data?.data?.eventInterests?.length &&
  //       data?.data?.eventInterests?.length > 0
  //     );
  //   }, [data?.data]);

  //   const isJoined = useMemo(() => {
  //     return (
  //       data?.data?.eventParticipants?.length &&
  //       data?.data?.eventParticipants?.length > 0
  //     );
  //   }, [data?.data]);

  //   const eventStatus = useMemo(() => {
  //     if (!data?.data) {
  //       return 'not-open';
  //     }

  //     const { data: eventData } = data;

  //     if (new Date(eventData.registrationTime) > new Date()) {
  //       return 'not-open';
  //     }

  //     if (new Date(eventData.startTime) > new Date()) {
  //       return 'opened';
  //     }

  //     if (eventData.endTime && new Date(eventData.endTime) > new Date()) {
  //       return 'running';
  //     }

  //     if (!eventData.endTime && !eventData.isEnded) {
  //       return 'running';
  //     }

  //     return 'ended';
  //   }, [data?.data]);

  //   const onJoinEvent = async () => {
  //     await joinEvent({ eventId: eventId });
  //     fetchApi({ eventId: eventId });
  //   };

  //   const onInterestEvent = async () => {
  //     await interestEvent({ eventId: eventId });
  //     fetchApi({ eventId: eventId });
  //   };

  //   const onUninterestEvent = async () => {
  //     await uninterestEvent({ eventId: eventId });
  //     fetchApi({ eventId: eventId });
  //   };

  //   if (isLoading || !data?.data) {
  //     return <LoadingIndicator />;
  //   }

  //   const { data: eventData } = data;

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
        {/* {eventData.title} */}
        // title
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
              <Typography>
                {/* {eventData.hostInformation?.fullName} */}
                // fullName
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {/* {eventData.hostInformation?.email} */}
                // email
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Hình thức</Typography>
            </Grid>
            <Grid item xs={9}>
              {/* {eventData.isOffline ? (
                <Typography
                  component="span"
                  fontWeight={600}
                  sx={{ color: theme.palette.warning.main }}
                >
                  Offline
                </Typography>
              ) : ( */}
              <Typography
                component="span"
                fontWeight={600}
                sx={{ color: theme.palette.success.main }}
              >
                Online
              </Typography>
              {/* )} */}
            </Grid>

            <Grid item xs={3}>
              <Typography>Tình trạng</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {/* {eventStatus} */}
                // eventStatus
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Mở đăng ký</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {/* {new Date(eventData.registrationTime).toDateString()} */}
                // registrationTime
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Bắt đâu diễn ra</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {/* {new Date(eventData.startTime).toDateString()} */}
                // startTime
              </Typography>
            </Grid>

            {/* {eventData?.endTime ? ( */}
            <>
              <Grid item xs={3}>
                <Typography>Kết thúc</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography>
                  {/* {new Date(eventData.endTime).toDateString()} */}
                  // endTime
                </Typography>
              </Grid>
            </>
            {/* ) : null} */}
          </Grid>
        </Box>

        <Box>
          <Button
            fullWidth
            variant="contained"
            // disabled={
            //   eventStatus === 'not-open' ||
            //   eventStatus === 'ended' ||
            //   isJoined ||
            //   joiningEvent
            // }
            startIcon={<AppRegistrationIcon />}
            sx={{ mb: 1 }}
            // onClick={onJoinEvent}
          >
            {/* {isJoined ? 'Đã tham gia' : 'Tham gia'} */}
            // Tham gia
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<BookmarkBorderIcon />}
            // disabled={isInterestingEvent || isUninterestingEvent}
            // onClick={isInterested ? onUninterestEvent : onInterestEvent}
          >
            {/* {isInterested ? 'Huỷ lưu' : 'Lưu'} */}
            // Lưu
          </Button>
        </Box>
      </Box>

      <Tabs
        value={tabKey}
        onChange={(_, key) => setTabKey(key)}
        aria-label="wrapped tabs"
      >
        <Tab value="description" label="Mô tả" />
        {/* {eventData?.publicParticipant ? ( */}
        <Tab value="participant" label="Người tham dự" />
        {/* ) : null} */}
      </Tabs>

      {tabKey === 'description' ? (
        <Box>
          <Typography>
            {/* {eventData?.description} */}
            // description
          </Typography>
        </Box>
      ) : null}

      {/* {tabKey === 'participant' ? <EventParticipantListTab /> : null} */}
    </Box>
  );
};

export default EventDetailPage;