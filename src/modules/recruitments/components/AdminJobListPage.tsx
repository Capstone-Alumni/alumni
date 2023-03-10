'use client';

import { Box, Typography, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useRecoilState } from 'recoil';
import useAdminApproveEventById from '../hooks/useAdminApproveJobById';
import useAdminGetEventList from '../hooks/useAdminGetJobList';
import useAdminRejectEventById from '../hooks/useAdminRejectJobById';
import { getAdminJobListParamsAtom } from '../states';
import AdminEventListTable from './AdminJobListTable';

const AdminEventListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getAdminJobListParamsAtom);
  const { data, reload, isLoading } = useAdminGetEventList();
  const { fetchApi: approveEvent } = useAdminApproveEventById();
  const { fetchApi: rejectEvent } = useAdminRejectEventById();

  const onApproveEvent = async (id: string) => {
    await approveEvent({ jobId: id });
    reload();
  };

  const onRejectEvent = async (id: string) => {
    await rejectEvent({ jobId: id });
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
        {isLoading ? <LoadingIndicator /> : null}

        {data?.data ? (
          <AdminEventListTable
            data={data?.data}
            page={params.page || 1}
            onApprove={onApproveEvent}
            onReject={onRejectEvent}
            onChangePage={(nextPage) => {
              setParams((prevParams) => ({ ...prevParams, page: nextPage }));
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default AdminEventListPage;
