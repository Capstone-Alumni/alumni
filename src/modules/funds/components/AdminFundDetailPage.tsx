import {
  Box,
  Divider,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { Fund } from '../types';
import { useState } from 'react';
import { renderEventStatus } from 'src/modules/events/components/EventDetailPage';

import { formatDate } from '@share/utils/formatDate';
import { useRecoilValue } from 'recoil';
import { currentTenantDataAtom } from '@share/states';
import { EditorPreview } from '@share/components/editor';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from '@mui/lab';
import LoadingIndicator from '@share/components/LoadingIndicator';
import useGetFundReportList from '../hooks/useGetFundReportList';
import { formatAmountMoney } from '../utils';
import Image from 'next/image';
import MyAvatar from '@share/components/MyAvatar';
import Link from '@share/components/NextLinkV2';

const AdminFundDetailPage = ({ fundData }: { fundData: Fund }) => {
  const [tabKey, setTabKey] = useState('description');
  const tenantData = useRecoilValue(currentTenantDataAtom);
  const theme = useTheme();

  const fundStatus = () => {
    if (new Date(fundData.startTime) > new Date()) {
      return 'not-started';
    }

    if (fundData.endTime && new Date(fundData.endTime) > new Date()) {
      return 'running';
    }

    return 'ended';
  };

  const { data: fundReport, isLoading: loadingReportList } =
    useGetFundReportList(fundData.id || '');

  const renderFundReport = () => {
    if (loadingReportList || !fundData.id) {
      return <LoadingIndicator />;
    }
    return (
      <Timeline
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {fundReport?.data.items.map(report => (
          <TimelineItem key={report.id}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography color="text.secondary">
                {formatDate(new Date(report.createdAt))}
              </Typography>
              <Typography variant="h6">{report.title}</Typography>
              <EditorPreview value={report.content} />
            </TimelineContent>
          </TimelineItem>
        ))}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
        </TimelineItem>
      </Timeline>
    );
  };

  const balancePercent = fundData.currentBalance / fundData.targetBalance;

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: theme.spacing(32),
          mb: 2,
        }}
      >
        <Image
          src={fundData?.backgroundImage || '/side_background.png'}
          alt="fund-image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Typography variant="h3" sx={{ mb: 1 }}>
        {fundData.title}
      </Typography>
      <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
        <MyAvatar
          displayName={fundData.host?.information?.fullName}
          photoUrl={fundData.host?.information?.avatarUrl}
        />

        <Stack direction="column">
          <Link href={`/profile/${fundData.hostId}`} prefetch={false}>
            <Typography fontWeight={600}>
              {fundData.host?.information?.fullName}
            </Typography>
          </Link>
          <Typography>{fundData.host?.information?.email}</Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(2),
          mb: 2,
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: 2,
            borderRadius: `${theme.shape.borderRadiusSm}px`,
            backgroundColor: theme.palette.background.neutral,
          }}
        >
          <Stack direction="column">
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 0.5 }}>
              <Typography fontWeight={600}>Tình trạng</Typography>
              <Typography>{renderEventStatus(fundStatus())}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 0.5 }}>
              <Typography fontWeight={600}>Bắt đầu</Typography>
              <Typography>
                {formatDate(new Date(fundData.startTime), 'dd/MM/yyyy')}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 0.5 }}>
              <Typography fontWeight={600}>Kết thúc</Typography>
              <Typography>
                {formatDate(new Date(fundData.endTime), 'dd/MM/yyyy')}
              </Typography>
            </Stack>
          </Stack>
          {tenantData?.vnp_tmnCode ? (
            <>
              <Divider sx={{ width: '100%', my: 1 }} />

              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Typography>Mục tiêu quỹ:</Typography>
                  <Typography variant="h6">
                    {formatAmountMoney(fundData.targetBalance * 100)}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography textAlign="right">{balancePercent}%</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={balancePercent > 100 ? 100 : balancePercent}
                    sx={{ height: '12px', flex: 1, width: '100%', mb: 0.5 }}
                  />
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  <Typography>Số tiền đã quyên góp được:</Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {formatAmountMoney(fundData.currentBalance)}
                  </Typography>
                </Stack>
              </Box>
            </>
          ) : null}
        </Box>
        <Tabs
          value={tabKey}
          onChange={(_, key) => setTabKey(key)}
          aria-label="wrapped tabs"
        >
          <Tab value="description" label="Mô tả" />
          <Tab value="report" label="Hoạt động" />
        </Tabs>

        {tabKey === 'description' ? (
          <Box sx={{ my: 2 }}>
            <EditorPreview value={fundData?.description || ''} />
          </Box>
        ) : null}

        {tabKey === 'report' ? (
          <Box sx={{ my: 2 }}>{renderFundReport()}</Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default AdminFundDetailPage;
