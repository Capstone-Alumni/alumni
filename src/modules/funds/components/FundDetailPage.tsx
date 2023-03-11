'use client';

import {
  Button,
  CircularProgress,
  Grid,
  Link,
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
import EditorPreview from '@share/components/editor/EditorPreview';
import { renderEventStatus } from 'src/modules/events/components/EventDetailPage';
import FundTransactionForm from './FundTransactionForm';

const FundDetailPage = () => {
  const [tabKey, setTabKey] = useState('description');
  const theme = useTheme();
  const pathname = usePathname();

  const fundId = pathname?.split('/')[2] || '';

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
      return 'not-open';
    }

    const { data: fundData } = data;

    if (new Date(fundData.registrationTime) > new Date()) {
      return 'not-open';
    }

    if (new Date(fundData.startTime) > new Date()) {
      return 'opened';
    }

    if (fundData.endTime && new Date(fundData.endTime) > new Date()) {
      return 'running';
    }

    if (!fundData.endTime && !fundData.isEnded) {
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

  return (
    <Box>
      {/* <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: theme.spacing(32),
          mb: 2,
        }}
      >
        <Image
          src="/side_background.png"
          alt="Fund-image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box> */}

      <Typography variant="h3" sx={{ mb: 1 }}>
        {fundData.title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(2),
          mb: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Typography>Người tổ chức</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{fundData.hostInformation?.fullName}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{fundData.hostInformation?.email}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Hình thức</Typography>
            </Grid>
            <Grid item xs={9}>
              {fundData.isOffline ? (
                <Typography
                  component="span"
                  fontWeight={600}
                  sx={{ color: theme.palette.warning.main }}
                >
                  Offline
                </Typography>
              ) : (
                <Typography
                  component="span"
                  fontWeight={600}
                  sx={{ color: theme.palette.success.main }}
                >
                  Online
                </Typography>
              )}
            </Grid>

            {fundData.location ? (
              <>
                <Grid item xs={3}>
                  <Typography>Nơi tổ chức</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography component="span" fontWeight={600}>
                    {fundData.location}
                  </Typography>
                </Grid>
              </>
            ) : null}

            <Grid item xs={3}>
              <Typography>Tình trạng</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{renderEventStatus(FundStatus)}</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>Bắt đâu diễn ra</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                {new Date(fundData.startTime).toDateString()}
              </Typography>
            </Grid>

            {fundData?.endTime ? (
              <>
                <Grid item xs={3}>
                  <Typography>Kết thúc</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography>
                    {new Date(fundData.endTime).toDateString()}
                  </Typography>
                </Grid>
              </>
            ) : null}
          </Grid>

          <Tabs
            value={tabKey}
            onChange={(_, key) => setTabKey(key)}
            aria-label="wrapped tabs"
          >
            <Tab value="description" label="Mô tả" />
            <Tab value="send" label="Đóng góp" />
          </Tabs>

          {tabKey === 'description' ? (
            <Box sx={{ my: 2 }}>
              <EditorPreview value={fundData?.description || ''} />
            </Box>
          ) : null}

          {tabKey === 'send' ? (
            <Box sx={{ my: 2 }}>
              <FundTransactionForm fundId={fundData.id} />
            </Box>
          ) : null}
        </Box>

        <Box sx={{ minWidth: theme.spacing(12) }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>
              Số tiền gây quỹ
            </Typography>

            <Box
              sx={{
                position: 'relative',
                width: 'fit-content',
                textAlign: 'center',
                margin: '0 auto',
                p: 3,
                mb: 1,
              }}
            >
              <Typography fontSize="32px" fontWeight={600} sx={{ mb: 1 }}>
                {(fundData.currentBalance * 100) / fundData.targetBalance || 0}%
              </Typography>

              <CircularProgress
                value={
                  (fundData.currentBalance * 100) / fundData.targetBalance || 0
                }
                variant="determinate"
                size={100}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  margin: 'auto',
                }}
              />
            </Box>

            <Typography variant="h6" textAlign="center">
              {fundData.currentBalance} / {fundData.targetBalance} (ngàn VND)
              <br />
              <Typography
                variant="caption"
                textAlign="center"
                sx={{ m: 'auto' }}
              >
                Cập nhập: {new Date(fundData.balanceUpdatedAt).toDateString()}
              </Typography>
            </Typography>
          </Box>

          <Button
            fullWidth
            variant={isSaved ? 'contained' : 'outlined'}
            startIcon={<BookmarkBorderIcon />}
            disabled={isSavingFund || isUnsavingFund}
            onClick={isSaved ? onUnsaveFund : onSaveFund}
            sx={{ mb: 1 }}
          >
            {isSaved ? 'Huỷ lưu' : 'Lưu'}
          </Button>

          <Link href={fundData?.statementFile} target="_blank">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<BookmarkBorderIcon />}
              disabled={!fundData?.statementFile}
            >
              File sao kê
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default FundDetailPage;
