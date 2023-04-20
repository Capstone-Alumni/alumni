'use client';

import { Box, Typography, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useRecoilState } from 'recoil';
import { getAdminReportListParamsAtom } from 'src/modules/reports/states';
import useAdminGetReportList from '../hooks/useAdminGetReportList';
import useDeleteReport from '../hooks/useDeleteReport';
import ViewReportListTable from './ViewReportListTable';

const ViewReportListPage = () => {
  const theme = useTheme();

  const [params, setParams] = useRecoilState(getAdminReportListParamsAtom);
  const { data, reload, isLoading } = useAdminGetReportList();
  const { fetchApi: deleteReport } = useDeleteReport();

  const onResponse = () => {
    reload();
  };

  const onDelete = async (id: string) => {
    await deleteReport({
      id,
    });
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
        <Typography variant="h3">Báo lỗi</Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
        }}
      >
        {isLoading && !data?.data ? <LoadingIndicator /> : null}

        {data?.data ? (
          <ViewReportListTable
            data={data?.data}
            page={params.page || 1}
            onResponse={onResponse}
            onDelete={onDelete}
            onChangePage={nextPage => {
              setParams(prevParams => ({ ...prevParams, page: nextPage }));
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default ViewReportListPage;
