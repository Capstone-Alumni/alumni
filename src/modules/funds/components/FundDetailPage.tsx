'use client';

import {
  Button,
  Divider,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import { Box, Typography } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import usePublicGetFundById from '../hooks/usePublicGetFundById';
import usePublicInterestFundById from '../hooks/usePublicSaveFundById';
import usePublicUninterestFundById from '../hooks/usePublicUnsaveFundById';
import { EditorPreview } from '@share/components/editor';
import { renderEventStatus } from 'src/modules/events/components/EventDetailPage';
import FundTransactionForm from './FundTransactionForm';
import FundTransactionListTab from './FundTransactionList';
import { formatDate } from '@share/utils/formatDate';
import { formatAmountMoney } from '../utils';
import FundReportList from './FundReportList';
import { useRecoilValue } from 'recoil';
import { currentTenantDataAtom } from '@share/states';
import Image from 'next/image';
import MyAvatar from '@share/components/MyAvatar';
import Link from '@share/components/NextLinkV2';

const FundDetailPage = () => {
  const [tabKey, setTabKey] = useState('description');
  const theme = useTheme();
  const pathname = usePathname();

  const fundId = pathname?.split('/')[2] || '';

  const tenantData = useRecoilValue(currentTenantDataAtom);

  const { data, fetchApi, isLoading } = usePublicGetFundById();
  const { fetchApi: saveFund, isLoading: isSavingFund } =
    usePublicInterestFundById();
  const { fetchApi: unsaveFund, isLoading: isUnsavingFund } =
    usePublicUninterestFundById();

  useEffect(() => {
    fetchApi({ fundId: fundId });
  }, []);

  const isSaved = useMemo(() => {
    return data?.data?.fundSaved?.length && data?.data?.fundSaved?.length > 0;
  }, [data?.data]);

  const FundStatus = useMemo(() => {
    if (!data?.data) {
      return 'not-started';
    }

    const { data: fundData } = data;

    if (new Date(fundData.startTime) > new Date()) {
      return 'not-started';
    }

    if (fundData.endTime && new Date(fundData.endTime) > new Date()) {
      return 'running';
    }

    return 'ended';
  }, [data?.data]);

  const onSaveFund = async () => {
    await saveFund({ fundId: fundId });
    fetchApi({ fundId: fundId });
  };

  const onUnsaveFund = async () => {
    await unsaveFund({ fundId: fundId });
    fetchApi({ fundId: fundId });
  };

  if (isLoading || !data?.data) {
    return <LoadingIndicator />;
  }

  const { data: fundData } = data;
  const balancePercent = fundData.currentBalance / fundData.targetBalance;

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
          <Link href={`/profile/${fundData.hostId}`}>
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
          flexDirection: 'row',
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
              <Typography>{renderEventStatus(FundStatus)}</Typography>
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

        {new Date() <= new Date(fundData.endTime) ? (
          <Stack direction="column" gap={2}>
            {tenantData?.vnp_tmnCode ? (
              <FundTransactionForm
                fundId={fundData.id}
                canDonate={
                  FundStatus === 'running' &&
                  fundData.currentBalance < fundData.targetBalance * 100
                }
                maxDonate={
                  fundData.targetBalance * 100 - fundData.currentBalance < 0
                    ? 0
                    : Math.min(
                        fundData.targetBalance * 100 - fundData.currentBalance,
                        10000000000,
                      )
                }
              />
            ) : null}

            <Button
              fullWidth
              variant={isSaved ? 'contained' : 'outlined'}
              startIcon={<BookmarkBorderIcon />}
              disabled={isSavingFund || isUnsavingFund}
              onClick={isSaved ? onUnsaveFund : onSaveFund}
              sx={{ mb: 1, minWidth: '200px' }}
            >
              {isSaved ? 'Bỏ lưu' : 'Lưu'}
            </Button>
          </Stack>
        ) : null}
      </Box>

      <Tabs
        value={tabKey}
        onChange={(_, key) => setTabKey(key)}
        aria-label="wrapped tabs"
      >
        <Tab value="description" label="Mô tả" />
        <Tab value="report" label="Hoạt động" />
        {tenantData?.vnp_tmnCode ? (
          <Tab value="transaction" label="Danh sách ủng hộ" />
        ) : null}
      </Tabs>

      {tabKey === 'description' ? (
        <Box sx={{ my: 2 }}>
          <EditorPreview value={fundData?.description || ''} />
        </Box>
      ) : null}

      {tabKey === 'report' ? (
        <Box sx={{ my: 2 }}>
          <FundReportList />
        </Box>
      ) : null}

      {tabKey === 'transaction' ? (
        <Box sx={{ my: 2 }}>
          <FundTransactionListTab />
        </Box>
      ) : null}
    </Box>
  );
};

export default FundDetailPage;
