'use client';

import { Button, Stack, Tab, Tabs, useTheme } from '@mui/material';
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
import usePublicInterestEventById from '../hooks/usePublicInterestEventById';
import usePublicUninterestEventById from '../hooks/usePublicUninterestEventById';
import EditorPreview from '@share/components/editor/EditorPreview';
import MyAvatar from '@share/components/MyAvatar';
import { formatDate } from '@share/utils/formatDate';
import Link from '@share/components/NextLinkV2';
import usePublicUnJoinEventById from '../hooks/usePublicUnJoinEventById';

type EventStatus = 'not-started' | 'running' | 'ended';

export const renderEventStatus = (status: EventStatus) => {
  switch (status) {
    case 'not-started':
      return 'Chưa bắt đầu';
    case 'running':
      return 'Đang diễn ra';
    case 'ended':
      return 'Đã kết thúc';
    default:
      // eslint-disable-next-line no-case-declarations
      const check: never = status;
      return check;
  }
};

const EventDetailPage = () => {
  const [tabKey, setTabKey] = useState('description');
  const theme = useTheme();
  const pathname = usePathname();

  const eventId = pathname?.split('/')[2] || '';

  const { data, fetchApi, isLoading } = usePublicGetEventById();
  const { fetchApi: joinEvent, isLoading: joiningEvent } =
    usePublicJoinEventById();
  const { fetchApi: unjoinEvent, isLoading: unjoiningEvent } =
    usePublicUnJoinEventById();
  const { fetchApi: interestEvent, isLoading: isInterestingEvent } =
    usePublicInterestEventById();
  const { fetchApi: uninterestEvent, isLoading: isUninterestingEvent } =
    usePublicUninterestEventById();

  useEffect(() => {
    fetchApi({ eventId: eventId });
  }, []);

  const isInterested = useMemo(() => {
    return (
      data?.data?.eventInterests?.length &&
      data?.data?.eventInterests?.length > 0
    );
  }, [data?.data]);

  const isJoined = useMemo(() => {
    return (
      data?.data?.eventParticipants?.length &&
      data?.data?.eventParticipants?.length > 0
    );
  }, [data?.data]);

  const eventStatus = useMemo(() => {
    if (!data?.data) {
      return 'not-started';
    }

    const { data: eventData } = data;

    if (new Date(eventData.startTime) > new Date()) {
      return 'not-started';
    }

    if (eventData.endTime && new Date(eventData.endTime) > new Date()) {
      return 'running';
    }

    return 'ended';
  }, [data?.data]);

  const onJoinEvent = async () => {
    await joinEvent({ eventId: eventId });
    fetchApi({ eventId: eventId });
  };

  const onUnjoinEvent = async () => {
    await unjoinEvent({ eventId: eventId });
    fetchApi({ eventId: eventId });
  };

  const onInterestEvent = async () => {
    await interestEvent({ eventId: eventId });
    fetchApi({ eventId: eventId });
  };

  const onUninterestEvent = async () => {
    await uninterestEvent({ eventId: eventId });
    fetchApi({ eventId: eventId });
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
          src={eventData?.backgroundImage || '/side_background.png'}
          alt="event-image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Typography variant="h3" sx={{ mb: 1 }}>
        {eventData.title}
      </Typography>

      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
        <MyAvatar
          displayName={eventData.host?.information?.fullName}
          photoUrl={eventData.host?.information?.avatarUrl}
        />

        <Stack direction="column">
          <Link href={`/profile/${eventData.userId}`} prefetch={false}>
            <Typography fontWeight={600}>
              {eventData.host?.information?.fullName}
            </Typography>
          </Link>
          <Typography>{eventData.host?.information?.email}</Typography>
        </Stack>
      </Stack>

      <Stack
        direction={{
          sm: 'column',
          md: 'row',
        }}
        gap={2}
        sx={{
          mb: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: theme.spacing(2),
            borderRadius: `${theme.shape.borderRadiusSm}px`,
            backgroundColor: theme.palette.background.neutral,
          }}
        >
          <Stack direction="column" gap={1} justifyContent="space-around">
            <Stack direction="row" alignItems="center">
              <Typography variant="h6" sx={{ minWidth: '8rem' }}>
                Hình thức
              </Typography>
              {eventData.isOffline ? (
                <Typography
                  fontWeight={600}
                  sx={{ color: theme.palette.warning.main }}
                >
                  Offline
                </Typography>
              ) : (
                <Typography
                  fontWeight={600}
                  sx={{ color: theme.palette.success.main }}
                >
                  Online
                </Typography>
              )}
            </Stack>

            <Stack direction="row" alignItems="flex-start">
              <Typography variant="h6" sx={{ minWidth: '8rem' }}>
                {eventData.isOffline ? 'Địa điểm' : 'Link tham gia'}
              </Typography>
              <Typography sx={{ wordBreak: 'break-all' }}>
                {eventData.location}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Typography variant="h6" sx={{ minWidth: '8rem' }}>
                Tình trạng
              </Typography>
              <Typography>{renderEventStatus(eventStatus)}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Typography variant="h6" sx={{ minWidth: '8rem' }}>
                Bắt đầu
              </Typography>
              <Typography>
                {formatDate(
                  new Date(eventData.startTime),
                  'dd/MM/yyyy - HH:ss',
                )}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center">
              <Typography variant="h6" sx={{ minWidth: '8rem' }}>
                Kết thúc
              </Typography>
              <Typography>
                {eventData.endTime
                  ? formatDate(
                      new Date(eventData.endTime),
                      'dd/MM/yyyy - HH:ss',
                    )
                  : 'Chưa cập nhập'}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Box>
          <Button
            fullWidth
            variant={isJoined ? 'outlined' : 'contained'}
            disabled={eventStatus === 'ended' || joiningEvent || unjoiningEvent}
            startIcon={<AppRegistrationIcon />}
            sx={{ mb: 1 }}
            onClick={isJoined ? onUnjoinEvent : onJoinEvent}
          >
            {isJoined ? 'Huỷ tham dự' : 'Tham dự'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<BookmarkBorderIcon />}
            disabled={isInterestingEvent || isUninterestingEvent}
            onClick={isInterested ? onUninterestEvent : onInterestEvent}
          >
            {isInterested ? 'Huỷ lưu' : 'Lưu'}
          </Button>
        </Box>
      </Stack>

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
        <Box sx={{ my: 2 }}>
          <EditorPreview value={eventData?.description || ''} />
        </Box>
      ) : null}

      {tabKey === 'participant' ? (
        <EventParticipantListTab eventId={eventId} />
      ) : null}
    </Box>
  );
};

export default EventDetailPage;
