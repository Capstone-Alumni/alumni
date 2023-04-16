import { Box, CardMedia, Grid, LinearProgress, Stack } from '@mui/material';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
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
          '&:hover': {
            opacity: '0.7',
            transition: 'all 0.2s',
            cursor: 'pointer',
          },
        }}
      >
        <CardMedia
          title="fund image"
          sx={{
            height: theme.spacing(18),
            padding: theme.spacing(2),
            backgroundImage: `url(${data.backgroundImage ?? ''})`,
            position: 'relative',
          }}
        />
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography noWrap variant="h6" sx={{ mb: 1 }}>
            {data.title}
          </Typography>

          <Box sx={{ flex: 1 }} />
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Stack direction="column" justifyContent="center" sx={{ mb: 1 }}>
              <Typography variant="caption">
                <strong>Bắt đầu:</strong>{' '}
                {formatDate(new Date(data.startTime), 'dd/MM/yyyy')}
              </Typography>
              <Typography variant="caption">
                <strong>Kết thúc:</strong>{' '}
                {formatDate(new Date(data.endTime), 'dd/MM/yyyy')}
              </Typography>
            </Stack>
            <Stack
              sx={{
                marginX: 'auto',
                marginBottom: 'auto',
              }}
              flexDirection="row"
              alignItems="center"
              gap="0.25rem"
            >
              <PermIdentityIcon
                fontSize="small"
                sx={{
                  color: 'gray',
                }}
              />
              <Typography variant="body2" fontWeight="bold">
                {data.hostInformation?.fullName}
              </Typography>
            </Stack>
          </Box>
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
