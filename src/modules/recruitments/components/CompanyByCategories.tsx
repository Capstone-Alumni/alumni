'use client';

import React from 'react';
import {
  Box,
  Button,
  Grid,
  styled,
  Typography,
  useTheme,
  Pagination,
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { getAdminJobListParamsAtom } from '../states';

import Link from 'next/link';
import CompanyItem from './CompanyItem';
import Slider from 'react-slick';
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
  const [type, setType] = React.useState<string>(data.items[0].type || '');

  const handleRenderCategories = () => {
    return data.items.map((company: Job) => {
      return (
        <CategoryWrapper
          variant={type === company.type ? 'contained' : 'outlined'}
          onClick={() => setType(company.type)}
        >
          {company.type}
        </CategoryWrapper>
      );
    });
  };

  const handleRenderCompanies = () => {
    return data.items.map((company: Job) => {
      return (
        company.type === type && (
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
      <Typography variant="h5" sx={{ margin: '0' }}>
        Việc làm theo danh mục
      </Typography>
      <Grid container gap="1rem" sx={{ marginTop: '0.25rem' }}>
        {handleRenderCategories()}
        {/* <Pagination
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
        /> */}
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: '0.25rem' }}>
        {handleRenderCompanies()}
      </Grid>
    </Grid>
  );
};

export default CompaniesSlider;
