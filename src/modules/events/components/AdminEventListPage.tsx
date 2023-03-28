'use client';

import { Button } from '@mui/material';
import { Box, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LoadingIndicator from '@share/components/LoadingIndicator';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import useAdminApproveEventById from '../hooks/useAdminApproveEventById';
import useAdminGetEventList from '../hooks/useAdminGetEventList';
import useAdminRejectEventById from '../hooks/useAdminRejectEventById';
import { getAdminEventListParamsAtom } from '../states';
import AdminEventListTable from './AdminEventListTable';

const AdminEventListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getAdminEventListParamsAtom);
  const { data, reload, isLoading } = useAdminGetEventList();
  const { fetchApi: approveEvent } = useAdminApproveEventById();
  const { fetchApi: rejectEvent } = useAdminRejectEventById();

  const onApproveEvent = async (id: string) => {
    await approveEvent({ eventId: id });
    reload();
  };

  const onRejectEvent = async (id: string) => {
    await rejectEvent({ eventId: id });
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
        <Typography variant="h3">Sự kiện</Typography>

        <Link href="/admin/action/event/create" prefetch={false}>
          <Button variant="contained" startIcon={<AddIcon />} role="link">
            Tạo sự kiện
          </Button>
        </Link>
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
            onChangePage={nextPage => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default AdminEventListPage;
