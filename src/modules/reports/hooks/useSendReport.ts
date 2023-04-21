import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type SendReportParams = {
  fullName: string;
  email: string;
  message: string;
};
type SendReportResponse = unknown;

type SendReportError = AxiosError;

const useSendReport = () => {
  const { fetchApi, isLoading, error } = useApi<
    SendReportParams,
    SendReportResponse,
    SendReportError
  >(
    'Report',
    ({ fullName, email, message }) => ({
      method: 'POST',
      url: '/api/reports',
      data: { fullName, email, message },
    }),
    {
      onError: () => {
        toast.error('Gửi báo cáo thất bại. Thử lại sau!');
      },
      onSuccess: () => {
        toast.success('Gửi báo cáo thành công!');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
    error,
  };
};

export default useSendReport;
