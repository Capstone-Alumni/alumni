'use client';

import {
  alpha,
  Button,
  Grid,
  styled,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import { Box, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import usePublicGetJobById from '../hooks/usePublicGetJobById';
import Image from 'next/image';
import LoadingIndicator from '@share/components/LoadingIndicator';

const StyledGeneralInfomation = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRadius: theme.spacing(1),
  padding: '1rem',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));

const StyledGridInfo = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const JobDetailPage = () => {
  const [tabKey, setTabKey] = useState('description');
  const theme = useTheme();
  const pathname = usePathname();

  const jobId = pathname?.split('/')[3] || '';

  const { data, fetchApi, isLoading } = usePublicGetJobById();

  useEffect(() => {
    fetchApi({ jobId });
  }, []);

  if (isLoading || !data?.data) {
    return <LoadingIndicator />;
  }

  const { data: jobData } = data;

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
          src="/side_background.png"
          alt="Job-image"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(2),
          mb: 2,
        }}
      >
        <StyledGeneralInfomation>
          <Typography fontWeight={600} variant="h6">
            Thông tin chung
          </Typography>
          <br />
          <Grid container spacing={0}>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <WorkIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Ngành ngề</Typography>
                  <Typography>{jobData.job}</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <LanguageIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Website</Typography>
                  <Typography>{jobData.website}</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <AttachMoneyIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Mức lương</Typography>
                  <Typography>{jobData.salary || 'Thương lượng'}</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
            <StyledGridInfo item xs={6}>
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <LocationOnIcon fontSize="large" />
                </Grid>
                <Grid item xs={10}>
                  <Typography fontWeight={600}>Địa chỉ</Typography>
                  <Typography>{jobData.address}</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
          </Grid>
        </StyledGeneralInfomation>

        <Box>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AppRegistrationIcon />}
            sx={{ mb: 1 }}
          >
            Tham gia
          </Button>
        </Box>
      </Box>

      <Tabs
        value={tabKey}
        onChange={(_, key) => setTabKey(key)}
        aria-label="wrapped tabs"
      >
        <Tab value="description" label="Mô tả" />
      </Tabs>

      {tabKey === 'description' ? (
        <Box>
          <Typography>{jobData.description}</Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default JobDetailPage;
