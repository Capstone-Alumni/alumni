import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { useAppSelector } from '@redux/hooks';
import { currentTenantSelector } from '@redux/slices/currentTenantSlice';
import { ReactNode } from 'react';
import { Event } from '../types';

const EventCardItem = ({
  data,
  actions,
}: {
  data: Event;
  actions?: ReactNode[];
}) => {
  const theme = useTheme();
  const currentTenant = useAppSelector(currentTenantSelector);

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
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="caption">
            {new Date(data.startTime).toDateString()}
          </Typography>

          <Typography variant="h6">{data.title}</Typography>

          <Typography variant="body2">
            {data.isOffline ? data.location : 'Online'}
          </Typography>

          <Typography variant="body2">
            {data.approvedStatus === -1 ? 'Đang chờ xác nhận' : null}
            {data.approvedStatus === 0 ? 'Đã bị từ chối' : null}
            {data.approvedStatus === 1 ? 'Đã được xác nhận' : null}
          </Typography>
        </CardContent>
        <CardActions>{actions}</CardActions>
      </Card>
    </Grid>
  );
};

export default EventCardItem;
