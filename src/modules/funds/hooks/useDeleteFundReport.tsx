import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type DeleteFundReportParams = {
  fundId: string;
  reportId: string;
};

type DeleteFundReportResponse = unknown;

type DeleteFundReportError = AxiosError;

const useDeleteFundReport = () => {
  const { fetchApi, isLoading } = useApi<
    DeleteFundReportParams,
    DeleteFundReportResponse,
    DeleteFundReportError
  >(
    'DeleteFundReport',
    ({ fundId, reportId }) => ({
      method: 'DELETE',
      url: `/api/funds/owner/${fundId}/reports/${reportId}`,
    }),
    {
      onError: () => {
        toast.error('Xoá báo cáo thất bại');
      },
      onSuccess: () => {
        toast.success('Xoá báo cáo thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useDeleteFundReport;
