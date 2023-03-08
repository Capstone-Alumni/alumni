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
import Link from 'next/link';

type EventStatus = 'not-open' | 'opened' | 'running' | 'ended';

export const renderEventStatus = (status: EventStatus) => {
  switch (status) {
    case 'not-open':
      return 'Chưa mở đăng ký';
    case 'opened':
      return 'Đã mở đăng ký';
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
      return 'not-open';
    }

    const { data: eventData } = data;

    if (new Date(eventData.startTime) < new Date()) {
      return 'not-open';
    }

    if (new Date(eventData.startTime) >= new Date()) {
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
          displayName={eventData.hostInformation?.fullName}
          photoUrl={eventData.hostInformation?.avatarUrl}
        />

        <Stack direction="column">
          <Link
            href={`/profile/${eventData.userId}?profile_tab=information`}
            prefetch={false}
          >
            <Typography fontWeight={600}>
              {eventData.hostInformation?.fullName}
            </Typography>
          </Link>
          <Typography>{eventData.hostInformation?.email}</Typography>
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
          <Stack
            direction={{ sm: 'column', md: 'row' }}
            gap={1}
            justifyContent="space-around"
          >
            <Box>
              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
                <Typography variant="h6">Hình thức</Typography>
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

              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
                <Typography variant="h6">
                  {eventData.isOffline ? 'Địa điểm' : 'Link tham gia'}
                </Typography>
                <Typography>{eventData.location}</Typography>
              </Stack>
            </Box>

            <Box>
              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
                <Typography variant="h6">Tình trạng</Typography>
                <Typography>{renderEventStatus(eventStatus)}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
                <Typography variant="h6">Bắt đầu</Typography>
                <Typography>
                  {formatDate(
                    new Date(eventData.startTime),
                    'dd/MM/yyyy - HH:ss',
                  )}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
                <Typography variant="h6">Kết thúc</Typography>
                <Typography>
                  {eventData.endTime
                    ? formatDate(
                        new Date(eventData.endTime),
                        'dd/MM/yyyy - HH:ss',
                      )
                    : 'Chưa cập nhập'}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Box>
          <Button
            fullWidth
            variant="contained"
            disabled={
              eventStatus === 'not-open' ||
              eventStatus === 'ended' ||
              isJoined ||
              joiningEvent
            }
            startIcon={<AppRegistrationIcon />}
            sx={{ mb: 1 }}
            onClick={onJoinEvent}
          >
            {isJoined ? 'Đã đăng ký' : 'Đăng ký'}
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

      {tabKey === 'participant' ? <EventParticipantListTab /> : null}
    </Box>
  );
};

export default EventDetailPage;
