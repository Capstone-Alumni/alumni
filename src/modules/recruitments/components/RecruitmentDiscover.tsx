'use client';

import { Box, Pagination, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import React from 'react';
import { useRecoilState } from 'recoil';
import usePublicGetEventList from 'src/modules/recruitments/hooks/usePublicGetJobList';
import { getAdminJobListParamsAtom } from '../states';
import Companies from './Companies';

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
      {/* <Carousel /> */}
      {data?.data && <Companies data={data?.data.items} />}
      <Pagination
        sx={{
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
        color="primary"
        count={Math.ceil(
          (data?.data.totalItems || 0) / (data?.data.itemPerPage || 1),
        )}
        page={params.page}
        onChange={(_, nextPage) => {
          setParams(prevParams => ({ ...prevParams, page: nextPage }));
        }}
      />
    </Box>
  );
};

export default RecruitmentDiscover;
