'use client';

import React, { ReactNode } from 'react';
import {
  Box,
  Typography,
  styled,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  useTheme,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: '60%',
  height: '100%',
  backgroundSize: 'contain',
  margin: 'auto',
}));

const StyledDiv = styled('div')(({ theme }) => ({
  height: theme.spacing(8),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

const Company = ({
  companyDetails,
  isSlide,
  actions,
}: {
  companyDetails: any;
  isSlide?: boolean;
  actions: ReactNode;
}) => {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={isSlide ? 12 : 6}
      lg={isSlide ? 12 : 4}
      xl={isSlide ? 12 : 4}
      sx={{
        margin: `${isSlide ? '0 0.5rem 0 0.5rem' : 0}`,
        border: `${isSlide ? '1px solid #ebd6fd' : 0}`,
        borderRadius: `${isSlide ? '8px' : 0}`,
      }}
    >
      <Card
        sx={{
          width: '100%',
          boxShadow: `${
            isSlide
              ? 'none'
              : '0 0 2px 0 rgba(145, 158, 171, 0.24),0 16px 32px -4px rgba(145, 158, 171, 0.24)'
          }`,
        }}
      >
        <StyledCardMedia
          title="news image"
          sx={{
            height: theme.spacing(18),
            padding: theme.spacing(2),
            backgroundImage: `url(${companyDetails.imageUrl})`,
          }}
        />
        <CardContent>
          <Grid container>
            <Grid item xs={1}>
              <CalendarTodayIcon fontSize="small" sx={{ color: '#64748b' }} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="body2">
                &nbsp;&nbsp;{companyDetails.expireAt}
              </Typography>
            </Grid>
          </Grid>
          <StyledDiv>
            <StyledTypography variant="h6">
              {companyDetails.major}
            </StyledTypography>
          </StyledDiv>
          <Grid container>
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
          </Grid>
        </CardContent>
        <CardActions>{actions}</CardActions>
      </Card>
    </Grid>
  );
};

export default Company;