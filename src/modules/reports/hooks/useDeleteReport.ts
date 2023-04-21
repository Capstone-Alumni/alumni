import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type ResponseReportParams = {
  id: string;
};
type ResponseReportResponse = unknown;

type ResponseReportError = AxiosError;

const useDeleteReport = () => {
  const { fetchApi, isLoading, error } = useApi<
    ResponseReportParams,
    ResponseReportResponse,
    ResponseReportError
  >(
    'DeleteReport',
    ({ id }) => ({
      method: 'DELETE',
      url: `/api/reports/${id}`,
    }),
    {
      onError: () => {
        toast.error('Xoá báo lỗi thất bại. Thử lại sau!');
      },
      onSuccess: () => {
        toast.success('Xoá báo lỗi thành công!');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
    error,
  };
};

export default useDeleteReport;
