'use client';

import React from 'react';
import { Button, Grid, styled, Typography, useTheme } from '@mui/material';

import Link from '@share/components/NextLinkV2';
import CompanyItem from './CompanyItem';
import { Job } from '../types';

const CategoryWrapper = styled(Button)(({ theme }) => ({
  display: 'inline-block',
}));

const CompaniesSlider = ({
  data,
}: {
  data: { items: Job[]; totalItems: number; itemPerPage: number };
}) => {
  const theme = useTheme();
  const [jobActivate, setJobActivate] = React.useState<string>(
    data.items[0]?.job || '',
  );

  const handleRenderCategories = () => {
    const duplicateTypeOfJobList = data.items.map(
      (company: Job) => company.job,
    );
    const uniqueArray = duplicateTypeOfJobList.filter(function (item, pos) {
      return duplicateTypeOfJobList.indexOf(item) == pos;
    });
    return uniqueArray.map((job: string, index: number) => {
      return (
        <CategoryWrapper
          key={index}
          variant={job === jobActivate ? 'contained' : 'outlined'}
          onClick={() => setJobActivate(job)}
        >
          {job}
        </CategoryWrapper>
      );
    });
  };

  const handleRenderCompanies = () => {
    return data.items.map((company: Job) => {
      return (
        company.job === jobActivate && (
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
        )
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
        <>
          <Typography variant="h5" sx={{ margin: '0' }}>
            Việc làm theo danh mục
          </Typography>
          <Grid container gap="1rem" sx={{ marginTop: '0.5rem' }}>
            {handleRenderCategories()}
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '0.25rem' }}>
            {handleRenderCompanies()}
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default CompaniesSlider;
