'use client';

import React, { ReactNode } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Link from '@share/components/NextLinkV2';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Job } from '../types';
import { formatDistanceToNow } from '@share/utils/formatDate';
import MyAvatar from '@share/components/MyAvatar';

const defaultCompanyImage =
  'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5ce6475845-00ab-4b0d-931e-8fe744c5db11.png';

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

const StyledTypographyCompanyName = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
}));

const BoxLayerCardMedia = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  height: '26px',
  backgroundColor: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  '&:last-child': {
    paddingBottom: '12px',
  },
}));

const Company = ({
  companyDetails,
  isSlide,
  actions,
  isPostedJobs,
  isAppliedJobs,
}: {
  companyDetails: Job;
  isSlide?: boolean;
  actions: ReactNode;
  isPostedJobs?: boolean;
  isAppliedJobs?: boolean;
}) => {
  const theme = useTheme();

  console.log(isAppliedJobs);

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
          ...(!isPostedJobs &&
            !isAppliedJobs && {
              '&:hover': {
                opacity: '0.7',
                transition: 'all 0.2s',
              },
            }),
        }}
      >
        {!isPostedJobs && !isAppliedJobs ? (
          <Link
            href={`/recruitments/job_details/${companyDetails.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
            prefetch={false}
          >
            <CardMedia
              title="news image"
              sx={{
                height: theme.spacing(18),
                padding: theme.spacing(2),
                backgroundImage: `url(${
                  companyDetails.companyImageUrl || defaultCompanyImage
                })`,
                position: 'relative',
              }}
            >
              <BoxLayerCardMedia>
                <>
                  <LocationOnOutlinedIcon
                    fontSize="small"
                    sx={{ color: '#fff', marginRight: '0.25rem' }}
                  />
                  <Typography variant="caption" color="#fff">
                    {companyDetails.address}
                  </Typography>
                </>
              </BoxLayerCardMedia>
            </CardMedia>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="body2" color="#919eab">
                  {companyDetails?.createdAt &&
                    formatDistanceToNow(new Date(companyDetails.createdAt))}
                </Typography>
              </Stack>
              <StyledDiv>
                <StyledTypography variant="h6">
                  {companyDetails.title}
                </StyledTypography>
              </StyledDiv>
              <Stack flexDirection="row" alignItems="center">
                <StyledTypographyCompanyName variant="body2" color="#919eab">
                  {companyDetails.companyName}
                </StyledTypographyCompanyName>
              </Stack>
              <Stack
                flexDirection="row"
                alignItems="center"
                gap="0.5rem"
                sx={{ marginTop: '0.5rem' }}
              >
                <MyAvatar
                  size="small"
                  displayName={
                    companyDetails.recruitmentOwner?.information?.fullName
                  }
                  photoUrl={
                    companyDetails.recruitmentOwner?.information?.avatarUrl
                  }
                />
                <Typography variant="body2" fontWeight="bold">
                  {companyDetails.recruitmentOwner?.information?.fullName}
                </Typography>
              </Stack>
            </CardContent>
          </Link>
        ) : (
          <>
            <CardMedia
              title="news image"
              sx={{
                height: theme.spacing(18),
                padding: theme.spacing(2),
                backgroundImage: `url(${
                  companyDetails.companyImageUrl || defaultCompanyImage
                })`,
                position: 'relative',
              }}
            >
              <BoxLayerCardMedia>
                <>
                  <LocationOnOutlinedIcon
                    fontSize="small"
                    sx={{ color: '#fff', marginRight: '0.25rem' }}
                  />
                  <Typography variant="caption" color="#fff">
                    {companyDetails.address}
                  </Typography>
                </>
              </BoxLayerCardMedia>
            </CardMedia>
            <StyledCardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 0.5 }}
              >
                <Typography variant="body2" color="#919eab">
                  {companyDetails?.createdAt &&
                    formatDistanceToNow(new Date(companyDetails.createdAt))}
                </Typography>
                <Stack direction="row" alignItems="center" gap="0.25rem">
                  <FiberManualRecordIcon
                    fontSize="small"
                    color={companyDetails.isPublic ? 'success' : 'error'}
                  />
                  <Typography
                    variant="body2"
                    color={companyDetails.isPublic ? '#919eab' : 'error'}
                  >
                    {companyDetails.isPublic ? 'ĐÃ ĐĂNG' : 'ADMIN ĐÃ TẮT'}
                  </Typography>
                </Stack>
              </Stack>
              <StyledDiv>
                <StyledTypography variant="h6">
                  {companyDetails.title}
                </StyledTypography>
              </StyledDiv>
              <Stack flexDirection="row" alignItems="center">
                <StyledTypographyCompanyName variant="body2" color="#919eab">
                  {companyDetails.companyName}
                </StyledTypographyCompanyName>
              </Stack>
              <CardActions style={{ padding: '8px 0 0 0' }}>
                {actions}
              </CardActions>
            </StyledCardContent>
          </>
        )}
      </Card>
    </Grid>
  );
};

export default Company;
