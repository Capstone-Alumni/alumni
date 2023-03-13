import { Box, Grid, LinearProgress, Stack } from '@mui/material';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { formatDate } from '@share/utils/formatDate';
import { ReactNode } from 'react';
import { Fund } from '../types';
import { formatAmountMoney } from '../utils';

const FundCardItem = ({
  data,
  actions,
}: {
  data: Fund;
  actions?: ReactNode[];
}) => {
  const theme = useTheme();

  const balancePercent = data.currentBalance / data.targetBalance;

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
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {data.title}
          </Typography>

          <Box sx={{ flex: 1 }} />

          <Stack direction="column" justifyContent="center" sx={{ mb: 1 }}>
            <Typography variant="caption">
              <strong>Bắt đầu:</strong>{' '}
              {formatDate(new Date(data.startTime), 'HH:mm - dd/MM/yyyy')}
            </Typography>
            <Typography variant="caption">
              <strong>Kết thúc:</strong>{' '}
              {formatDate(new Date(data.endTime), 'HH:mm - dd/MM/yyyy')}
            </Typography>
          </Stack>

          {/* <Stack direction="row" gap={1} alignItems="center" sx={{ mb: 2 }}>
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
          </Stack> */}

          <Box>
            <LinearProgress
              variant="determinate"
              value={balancePercent > 100 ? 100 : balancePercent}
              sx={{ height: '8px', flex: 1, width: '100%', mb: 0.5 }}
            />
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              fontWeight={600}
              sx={{ color: theme.palette.primary.main }}
            >
              {formatAmountMoney(data.currentBalance)}
            </Typography>
            <Typography fontWeight={600}>{balancePercent}%</Typography>
          </Stack>
          <Typography variant="body2" fontWeight={600} color="GrayText">
            với mục tiêu {formatAmountMoney(data.targetBalance * 100)}
          </Typography>
        </CardContent>
        <CardActions>{actions}</CardActions>
      </Card>
    </Grid>
  );
};

export default FundCardItem;
