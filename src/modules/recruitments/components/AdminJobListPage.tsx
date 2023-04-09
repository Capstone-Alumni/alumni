'use client';

import { Box, Typography, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useRecoilState } from 'recoil';
import useAdminApproveJobById from '../hooks/useAdminApproveJobById';
import useAdminGetJobList from '../hooks/useAdminGetJobList';
import useAdminRejectJobById from '../hooks/useAdminRejectJobById';
import { getAdminJobListParamsAtom } from '../states';
import AdminJobListTable from './AdminJobListTable';

const AdminJobListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getAdminJobListParamsAtom);
  const { data, reload, isLoading } = useAdminGetJobList();
  const { fetchApi: approveJob } = useAdminApproveJobById();
  const { fetchApi: rejectJob } = useAdminRejectJobById();

  const onApproveJob = async (id: string) => {
    await approveJob({ jobId: id });
    reload();
  };

  const onRejectJob = async (id: string) => {
    await rejectJob({ jobId: id });
    reload();
  };

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
        <Typography variant="h3">Tuyển dụng</Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
        }}
      >
        {isLoading && !data?.data ? <LoadingIndicator /> : null}

        {data?.data ? (
          <AdminJobListTable
            data={data?.data}
            page={params.page || 1}
            onApprove={onApproveJob}
            onReject={onRejectJob}
            onChangePage={nextPage => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default AdminJobListPage;
