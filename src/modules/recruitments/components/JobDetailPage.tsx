'use client';

import {
  alpha,
  Button,
  Grid,
  styled,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import { Box, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
// import usePublicGetEventById from '../hooks/usePublicGetEventById';
import Image from 'next/image';
// import usePublicJoinEventById from '../hooks/usePublicJoinEventById';
// import EventParticipantListTab from './EventParticipantListTab';
// import usePublicInterestEventById from '../hooks/usePublicInterestEventById';
// import usePublicUninterestEventById from '../hooks/usePublicUninterestEventById';

const StyledGeneralInfomation = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRadius: theme.spacing(1),
  padding: '1rem',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));

const StyledGridInfo = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(2),
          mb: 2,
        }}
      >
        <StyledGeneralInfomation>
          <Typography fontWeight={600} variant="h6">
            Thông tin chung
          </Typography>
          <br />
          <Grid container spacing={0}>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <WorkIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Ngành ngề</Typography>
                  <Typography>Kĩ sư Backend</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <LanguageIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Website</Typography>
                  <Typography>fpt.edu.vn</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <AttachMoneyIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Mức lương</Typography>
                  <Typography>Thương lượng</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <LocationOnIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Địa chỉ</Typography>
                  <Typography>
                    124 Huỳnh Tấn Phát, phường Tân Thuận Tây, quận 7, TP. Hồ Chí
                    Minh
                  </Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
          </Grid>
        </StyledGeneralInfomation>

        <Box>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AppRegistrationIcon />}
            sx={{ mb: 1 }}
          >
            Tham gia
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<BookmarkBorderIcon />}
          >
            Lưu
          </Button>
        </Box>
      </Box>

      <Tabs
        value={tabKey}
        onChange={(_, key) => setTabKey(key)}
        aria-label="wrapped tabs"
      >
        <Tab value="description" label="Mô tả" />
        <Tab value="participant" label="Người tham dự" />
      </Tabs>

      {tabKey === 'description' ? (
        <Box>
          <Typography> description</Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default EventDetailPage;
