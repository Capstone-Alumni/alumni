import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { currentTenantDataAtom } from '@share/states';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { Event } from '../types';
import { formatDate } from '@share/utils/formatDate';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import MyAvatar from '@share/components/MyAvatar';
import { getShortTitle } from '@share/utils/getShortTitle';

const EventCardItem = ({
  data,
  actions,
  showStatus = false,
}: {
  data: Event;
  actions?: ReactNode[];
  showStatus?: boolean;
}) => {
  const theme = useTheme();
  const currentTenant = useRecoilValue(currentTenantDataAtom);

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
        <CardMedia
          title="news image"
          sx={{
            height: theme.spacing(18),
            padding: theme.spacing(2),
            backgroundImage: `url(${
              data.backgroundImage ?? currentTenant?.background1
            })`,
          }}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Stack direction="row">
            <FiberManualRecordIcon
              fontSize="small"
              color={data.isOffline ? 'warning' : 'success'}
            />
            <Typography variant="body2">
              {data.isOffline ? 'Offline' : 'Online'}
            </Typography>

            <Box sx={{ flex: 1 }} />

            <Typography variant="body2">
              {formatDate(new Date(data.startTime))}
            </Typography>
          </Stack>

          <Typography variant="h6">{getShortTitle(data.title)}</Typography>

          {data.isOffline ? (
            <Typography variant="body2">{data.location}</Typography>
          ) : null}

          {showStatus ? (
            <Typography variant="body2">
              {data.approvedStatus === -1 ? 'Đang chờ xác nhận' : null}
              {data.approvedStatus === 0 ? 'Đã bị từ chối' : null}
              {data.approvedStatus === 1 ? 'Đã được xác nhận' : null}
            </Typography>
          ) : null}

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" gap={1} alignItems="center" sx={{ mt: 1 }}>
            <MyAvatar
              size="small"
              displayName={data.hostInformation?.fullName}
              photoUrl={data.hostInformation?.avatarUrl}
            />
            <Stack direction="column" justifyContent="center">
              <Typography variant="body2">
                {data.hostInformation?.fullName}
              </Typography>
              {data.hostInformation?.alumClass?.grade ? (
                <Typography variant="caption">
                  {data.hostInformation?.alumClass?.grade?.code}
                  {' / '}
                  {data.hostInformation?.alumClass?.name}
                </Typography>
              ) : null}
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>{actions}</CardActions>
      </Card>
    </Grid>
  );
};

export default EventCardItem;
