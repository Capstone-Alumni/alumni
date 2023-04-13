import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
  styled,
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

const EventCardItem = ({
  data,
  actions,
}: {
  data: Event;
  actions?: ReactNode[];
}) => {
  const theme = useTheme();
  const currentTenant = useRecoilValue(currentTenantDataAtom);

  const isEnded = useMemo(
    () => data.isEnded || new Date(data.endTime) < new Date(),
    [],
  );

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link
          href={`/events/${data.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
          prefetch={false}
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
            <Stack direction="row" alignItems="center" color="#919eab">
              <Typography variant="body2">
                {formatDateEvent(new Date(data.startTime))}
              </Typography>
              <Box sx={{ flex: 1 }} />
              {actions}
            </Stack>
            <Typography variant="h6">{getShortTitle60(data.title)}</Typography>
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
                  displayName={data.hostInformation?.fullName}
                  photoUrl={data.hostInformation?.avatarUrl}
                />
                <Typography variant="body2" fontWeight="bold">
                  {data.hostInformation?.fullName}
                </Typography>
              </Stack>
              <Stack justifyContent="center">
                {isEnded ? (
                  <Typography variant="caption" color="error" fontWeight="bold">
                    ĐÃ KẾT THÚC
                  </Typography>
                ) : null}
              </Stack>
            </Stack>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  );
};

export default EventCardItem;
