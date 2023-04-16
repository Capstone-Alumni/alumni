'use client';

import Linkify from 'react-linkify';
import { alpha, Grid, styled, Tab, Tabs, useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';
import Image from 'next/image';
import EditorPreview from '@share/components/editor/EditorPreview';

import { useRecoilValue } from 'recoil';
import { Job } from '../types';

const StyledGeneralInfomation = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRadius: theme.spacing(1),
  padding: '1rem',
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));

const StyledGridInfo = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const JobDetailPagePreview = ({ data }: { data: Job }) => {
  const tabKey = 'description';
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: theme.spacing(32),
          borderRadius: theme.spacing(1),
          overflow: 'hidden',
          mb: 2,
        }}
      >
        <img
          src={data?.companyImageUrl}
          alt="job-image"
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
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
                  <Typography>{data.job}</Typography>
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
                  <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a target="blank" href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}
                  >
                    <Typography>{data.website}</Typography>
                  </Linkify>
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
                  <Typography>{data.salary || 'Thương lượng'}</Typography>
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
                  <Typography>{data.address}</Typography>
                </Grid>
              </Grid>
            </StyledGridInfo>
          </Grid>
        </StyledGeneralInfomation>
      </Box>

      <Box
        sx={{
          width: '100%',
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          {data?.title}
        </Typography>
      </Box>

      <Tabs value={tabKey} aria-label="wrapped tabs">
        <Tab value="description" label="Mô tả" />
      </Tabs>

      {tabKey === 'description' ? (
        <Box sx={{ my: 2 }}>
          <EditorPreview value={data?.description || ''} />
        </Box>
      ) : null}
    </Box>
  );
};

export default JobDetailPagePreview;
