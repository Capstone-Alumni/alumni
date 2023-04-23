'use client';

import React from 'react';
import { Button, Grid, Typography, useTheme } from '@mui/material';

import Link from '@share/components/NextLinkV2';
import CompanyItem from './CompanyItem';
import { Job } from '../types';

const CompaniesSlider = ({
  data,
}: {
  data: { items: Job[]; totalItems: number; itemPerPage: number };
}) => {
  const theme = useTheme();

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
      {data && data.items.length > 0 ? (
        <Grid container spacing={2}>
          {handleRenderCompanies()}
        </Grid>
      ) : (
        <Typography variant="h5" sx={{ margin: 'auto', mt: 2 }}>
          Chưa có việc làm nào
        </Typography>
      )}
    </Grid>
  );
};

export default CompaniesSlider;
