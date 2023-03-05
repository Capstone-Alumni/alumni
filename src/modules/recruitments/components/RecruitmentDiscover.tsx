'use client';

import { Box, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import React from 'react';
import { useRecoilState } from 'recoil';
import usePublicGetEventList from 'src/modules/recruitments/hooks/usePublicGetJobList';
import { getAdminJobListParamsAtom } from '../states';
import Companies from './Companies';
import CompanyByCategories from './CompanyByCategories';

const RecruitmentDiscover = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getAdminJobListParamsAtom);
  const { data, reload, isLoading } = usePublicGetEventList();

  return (
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
          <CompanyByCategories data={data?.data} />
        </>
      )}
    </Box>
  );
};

export default RecruitmentDiscover;
