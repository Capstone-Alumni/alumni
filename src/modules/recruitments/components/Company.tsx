'use client';

import React from 'react';
import { Box, Typography, styled, Grid } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Wrapper = styled(Box)(({ theme }) => ({
  height: ' 220px',
  borderRadius: '8px',
  border: '1px solid #eaeaea',
  marginRight: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '& .MuiBox-root:nth-of-type(1)': {
    height: '40%',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: '60%',
      height: '100%',
      objectFit: 'contain',
      margin: 'auto',
    },
  },
  '& .MuiBox-root:nth-of-type(2)': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const FlexWrapper = styled(Box)(({ theme }) => ({
  height: ' 220px',
  padding: '0.5rem',
  borderRadius: '8px',
  border: '1px solid #eaeaea',
  display: 'flex',
  gap: '0.75rem',
  '& .MuiBox-root:nth-of-type(1)': {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    width: '30%',
    '& img': {
      width: '90%',
      height: '100%',
      objectFit: 'contain',
      margin: 'auto',
    },
  },
  '& .MuiBox-root:nth-of-type(2)': {
    display: 'flex',
    padding: '1rem 0',
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
}));

const Company = ({ companyDetails, isSlide }: any) => {
  return isSlide ? (
    <Wrapper>
      <Box>
        <img src={companyDetails.imageUrl} />
      </Box>
      <Box>
        <Typography variant="h5" align="center">
          {companyDetails.name}
        </Typography>
        <Typography
          variant="body2"
          color={'#65758c'}
          fontStyle="italic"
          align="center"
        >
          {companyDetails.location}
        </Typography>
        <Typography variant="h6" color="#3b82f6" align="center">
          Có {companyDetails.resourcesNeed} vị trí tuyển dụng
        </Typography>
      </Box>
    </Wrapper>
  ) : (
    <FlexWrapper>
      <Box>
        <img src={companyDetails.imageUrl} />
      </Box>
      <Box>
        <Typography variant="subtitle1" align="left">
          {companyDetails.major}
        </Typography>
        <Grid container sx={{ color: 'text.primary', marginTop: '0.25rem' }}>
          <Grid item xs={1}>
            <AccountBalanceIcon fontSize="small" sx={{ color: '#64748b' }} />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body2">
              &nbsp;&nbsp;{companyDetails.name}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <LocationOnIcon fontSize="small" sx={{ color: '#64748b' }} />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body2">
              &nbsp;&nbsp;{companyDetails.location}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <CalendarTodayIcon fontSize="small" sx={{ color: '#64748b' }} />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body2">
              &nbsp;&nbsp;{companyDetails.expireAt}
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ marginTop: '0.5rem' }}>
            <AttachMoneyIcon fontSize="small" sx={{ color: '#3883f6' }} />
          </Grid>
          <Grid item xs={11} sx={{ marginTop: '0.45rem' }}>
            <Typography variant="body2" fontWeight={'bold'} color={'#3883f6'}>
              &nbsp;&nbsp;{companyDetails.salary}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </FlexWrapper>
  );
};

export default Company;
