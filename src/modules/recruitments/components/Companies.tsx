'use client';

import React from 'react';
import {
  Box,
  Button,
  Grid,
  Pagination,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { getAdminJobListParamsAtom } from '../states';

import Link from 'next/link';
import CompanyItem from './CompanyItem';
import Slider from 'react-slick';
import { Job } from '../types';

const FlexWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  gap: '1rem',

  '& .MuiBox-root': {
    width: '32%',
  },
}));

const Spacer = styled('div')(({ theme }) => ({
  marginTop: `${theme.spacing(6)}`,
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  display: 'flex',
  width: '100%',
}));

const CompaniesSlider = ({
  data,
}: {
  data: { items: Job[]; totalItems: number; itemPerPage: number };
}) => {
  const theme = useTheme();

  const [params, setParams] = useRecoilState(getAdminJobListParamsAtom);

  const handleRenderCompanies = () => {
    return data.items.map((company: Job) => {
      return (
        <CompanyItem
          key={company.id}
          companyDetails={company}
          actions={[
            <Link
              key="edit-btn"
              href={`/recruitments/job_details/${company.id}`}
              style={{ width: '100%', marginRight: theme.spacing(1) }}
            >
              <Button fullWidth variant="outlined">
                Tìm hiểu thêm
              </Button>
            </Link>,
          ]}
        />
      );
    });
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        mb: 2,
        ml: 2,
        mt: 1,
      }}
    >
      <Typography variant="h5" sx={{ margin: '0' }}>
        Việc làm hot
      </Typography>
      <Spacer />
      <Grid container spacing={2}>
        {handleRenderCompanies()}
      </Grid>
      <Pagination
        sx={{
          margin: '1rem auto',
          display: 'flex',
          justifyContent: 'center',
        }}
        color="primary"
        count={Math.ceil((data?.totalItems || 0) / (data?.itemPerPage || 1))}
        page={params.page}
        onChange={(_, nextPage) => {
          setParams((prevParams) => ({ ...prevParams, page: nextPage }));
        }}
      />
    </Grid>
  );
};

export default CompaniesSlider;
