import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type ResponseReportParams = {
  id: string;
  response: string;
};
type ResponseReportResponse = unknown;

type ResponseReportError = AxiosError;

const useResponseReport = () => {
  const { fetchApi, isLoading, error } = useApi<
    ResponseReportParams,
    ResponseReportResponse,
    ResponseReportError
  >(
    'Response',
    ({ response, id }) => ({
      method: 'PUT',
      url: `/api/reports/${id}`,
      data: { response },
    }),
    {
      onError: () => {
        toast.error('Gửi hỗ trợ lỗi thất bại. Thử lại sau!');
      },
      onSuccess: () => {
        toast.success('Gửi hỗ trợ lỗi thành công!');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
    error,
  };
};

export default useResponseReport;
