'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { useRecoilState } from 'recoil';

import { GetAppliedJobListByIdResponse } from '../hooks/usePublicGetAppliedJobListById';
import { getCandiatesAppliedJobListParamsAtom } from '../states';
import UsersAppliedJobListTable from './UsersAppliedJobListTable';

const UsersAppliedJobListPage = ({
  data,
}: {
  data: GetAppliedJobListByIdResponse;
}) => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(
    getCandiatesAppliedJobListParamsAtom,
  );

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: theme.spacing(4),
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">Danh sách những người đã nộp</Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
        }}
      >
        <UsersAppliedJobListTable
          data={data}
          page={params.page}
          onChangePage={(nextPage) => {
            setParams((prevParams) => ({ ...prevParams, page: nextPage }));
          }}
        />
      </Box>
    </Box>
  );
};

export default UsersAppliedJobListPage;
