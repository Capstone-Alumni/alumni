import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { AdminFundReportFormValues } from '../components/AdminFundReportForm';

type UpdateFundReportParams = AdminFundReportFormValues & {
  fundId: string;
  reportId: string;
};

type UpdateFundReportResponse = unknown;

type UpdateFundReportError = AxiosError;

const useUpdateFundReport = () => {
  const { fetchApi, isLoading } = useApi<
    UpdateFundReportParams,
    UpdateFundReportResponse,
    UpdateFundReportError
  >(
    'UpdateFundReport',
    ({ fundId, reportId, ...data }) => ({
      method: 'PUT',
      url: `/api/funds/owner/${fundId}/reports/${reportId}`,
      data: data,
    }),
    {
      onError: () => {
        toast.error('Cập nhật báo cáo thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhật báo cáo thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useUpdateFundReport;
