import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Link from '@share/components/NextLinkV2';

import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { currentTenantDataAtom } from '@share/states';
import { ReactNode, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Event } from '../types';
import { formatDateEvent } from '@share/utils/formatDate';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import MyAvatar from '@share/components/MyAvatar';
import { getShortTitle60 } from '@share/utils/getShortTitle';

const StyledDiv = styled('div')(({ theme }) => ({
  height: theme.spacing(8),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

const BoxLayerCardMedia = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  height: '26px',
  backgroundColor: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
}));

const LineRed = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  height: '3px',
  backgroundColor: 'rgb(255,72,67)',
}));

const EventCardItem = ({
  data,
  actions,
}: {
  data: Event;
  actions?: ReactNode[];
}) => {
  const theme = useTheme();
  const currentTenant = useRecoilValue(currentTenantDataAtom);

  const isEnded = useMemo(() => new Date(data.endTime) < new Date(), []);

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            opacity: '0.7',
            transition: 'all 0.2s',
          },
        }}
      >
        <Link
          href={`/events/${data.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <CardMedia
            title="news image"
            sx={{
              height: theme.spacing(18),
              padding: theme.spacing(2),
              backgroundImage: `url(${
                data.backgroundImage ?? currentTenant?.background1
              })`,
              position: 'relative',
            }}
          >
            <BoxLayerCardMedia>
              {data.isOffline ? (
                <>
                  <LocationOnOutlinedIcon
                    fontSize="small"
                    sx={{ color: '#fff', marginRight: '0.25rem' }}
                  />
                  <Typography variant="caption" color="#fff">
                    {data.location}
                  </Typography>
                </>
              ) : (
                <>
                  <WifiOutlinedIcon
                    fontSize="small"
                    sx={{ color: '#fff', marginRight: '0.25rem' }}
                  />
                  <Typography variant="caption" color="#fff">
                    Online
                  </Typography>
                </>
              )}
            </BoxLayerCardMedia>
          </CardMedia>

          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              '&:last-child': {
                paddingBottom: '16px',
              },
            }}
          >
            <Stack direction="row" alignItems="center">
              <Typography
                variant="body2"
                color={isEnded ? '#919eab' : 'primary'}
              >
                {formatDateEvent(new Date(data.startTime))}
              </Typography>
              <Box sx={{ flex: 1 }} />
              {actions}
            </Stack>
            <StyledDiv>
              <StyledTypography variant="h6">
                {getShortTitle60(data.title)}
              </StyledTypography>
            </StyledDiv>
            <Box sx={{ flex: 1 }} />
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 1 }}
            >
              <Stack flexDirection="row" alignItems="center" gap="0.5rem">
                <MyAvatar
                  size="small"
                  displayName={data.host?.information?.fullName}
                  photoUrl={data.host?.information?.avatarUrl}
                />
                <Typography variant="body2" fontWeight="bold">
                  {data.host?.information?.fullName}
                </Typography>
              </Stack>
              <Stack justifyContent="center">
                {isEnded ? (
                  <Typography variant="caption" color="error" fontWeight="bold">
                    ĐÃ KẾT THÚC
                  </Typography>
                ) : null}
              </Stack>
              {isEnded && <LineRed />}
            </Stack>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};

export default EventCardItem;
