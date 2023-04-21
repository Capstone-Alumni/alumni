'use client';

import { Box, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import React from 'react';
import { useRecoilState } from 'recoil';
import usePublicGetEventList from 'src/modules/recruitments/hooks/usePublicGetJobList';
import {
  getAdminJobListParamsAtom,
  getPublicJobListParamsAtom,
} from '../states';
import Companies from './Companies';
import CompanyByCategories from './CompanyByCategories';
import SearchInput from '@share/components/SearchInput';
import { useState } from 'react';

const RecruitmentDiscover = () => {
  const theme = useTheme();
  const [search, setSearch] = useState('');

  const [params, setParams] = useRecoilState(getPublicJobListParamsAtom);
  const { data, isLoading } = usePublicGetEventList();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setParams((prevParams) => ({ ...prevParams, title: search }));
        }}
        style={{ marginBottom: theme.spacing(2) }}
      >
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
      <Box
        sx={{
          marginLeft: `-${theme.spacing(2)}`,
          marginRight: `-${theme.spacing(2)}`,
        }}
      >
        {isLoading ? <LoadingIndicator /> : null}
        {data?.data && (
          <>
            <Companies data={data?.data} />
            <Pagination
              sx={{
                margin: '1rem auto',
                display: 'flex',
                justifyContent: 'center',
              }}
              color="primary"
              count={Math.ceil(
                (data?.data.totalItems || 0) / (data?.data.itemPerPage || 1),
              )}
              page={params.page}
              onChange={(_, nextPage) => {
                setParams((prevParams) => ({ ...prevParams, page: nextPage }));
              }}
            />
            <CompanyByCategories data={data?.data} />
          </>
        )}
      </Box>
    </>
  );
};

export default RecruitmentDiscover;
