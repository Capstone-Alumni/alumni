import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { ReactNode } from 'react';
import { Fund } from '../types';

const FundCardItem = ({
  data,
  actions,
}: {
  data: Fund;
  actions?: ReactNode[];
}) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
      <Card
        sx={{
          width: '100%',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="caption">
              {new Date(data.startTime).toDateString()}
            </Typography>

            <Typography variant="caption">
              {data.isOffline ? data.location : 'Online'}
            </Typography>
          </Box>

          <Typography variant="h6">{data.title}</Typography>

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

export default FundCardItem;
