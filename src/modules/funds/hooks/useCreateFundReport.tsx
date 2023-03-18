import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { AdminFundReportFormValues } from '../components/AdminFundReportForm';

type CreateFundReportParams = AdminFundReportFormValues & {
  fundId: string;
};

type CreateFundReportResponse = unknown;

type CreateFundReportError = AxiosError;

const useCreateFundReport = () => {
  const { fetchApi, isLoading } = useApi<
    CreateFundReportParams,
    CreateFundReportResponse,
    CreateFundReportError
  >(
    'createFundReport',
    ({ fundId, ...data }) => ({
      method: 'POST',
      url: `/api/funds/owner/${fundId}/reports`,
      data: data,
    }),
    {
      onError: () => {
        toast.error('Tạo báo cáo thất bại');
      },
      onSuccess: () => {
        toast.success('Tạo báo cáo thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useCreateFundReport;
