'use client';

import { Box, Button, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useRecoilState } from 'recoil';
import useAdminApproveFundById from '../hooks/useAdminApproveFundById';
import useAdminGetFundList from '../hooks/useAdminGetFundList';
import useAdminRejectFundById from '../hooks/useAdminRejectFundById';
import { getAdminFundListParamsAtom } from '../states';
import AdminFundListTable from './AdminFundListTable';
import Link from 'next/link';

const AdminFundListPage = () => {
  const theme = useTheme();
  const [params, setParams] = useRecoilState(getAdminFundListParamsAtom);
  const { data, reload, isLoading } = useAdminGetFundList();
  const { fetchApi: approveFund } = useAdminApproveFundById();
  const { fetchApi: rejectFund } = useAdminRejectFundById();

  const onApproveFund = async (id: string) => {
    await approveFund({ fundId: id });
    reload();
  };

  const onRejectFund = async (id: string) => {
    await rejectFund({ fundId: id });
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
        <Typography variant="h3">Gây quỹ</Typography>

        <Link href="/admin/funds/create">
          <Button variant="contained" startIcon={<AddIcon />} role="link">
            Thêm quỹ mới
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
          <AdminFundListTable
            data={data?.data}
            page={params.page || 1}
            onApprove={onApproveFund}
            onReject={onRejectFund}
            onChangePage={nextPage => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default AdminFundListPage;
