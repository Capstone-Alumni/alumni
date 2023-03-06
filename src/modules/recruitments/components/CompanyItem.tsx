'use client';

import React, { ReactNode } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Job } from '../types';

const defaultCompanyImage =
  'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5ce6475845-00ab-4b0d-931e-8fe744c5db11.png';

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: '80%',
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
  companyDetails: Job;
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
            padding: theme.spacing(0),
            width: '100%',
            margin: '0',
            backgroundImage: `url(${
              companyDetails.companyImageUrl || defaultCompanyImage
            })`,
          }}
        />
        <CardContent>
          <StyledDiv>
            <StyledTypography variant="h6">
              {companyDetails.title}
            </StyledTypography>
          </StyledDiv>
          <Grid container>
            <Grid item xs={1}>
              <AccountBalanceIcon fontSize="small" sx={{ color: '#64748b' }} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="body2">
                &nbsp;&nbsp;{companyDetails.companyName}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <LocationOnIcon fontSize="small" sx={{ color: '#64748b' }} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="body2">
                &nbsp;&nbsp;{companyDetails.address}
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
