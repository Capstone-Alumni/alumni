import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type AdminRejectJobByIdParams = {
  jobId: string;
};

type AdminRejectJobByIdResponse = unknown;

type AdminRejectJobByIdError = AxiosError;

const useAdminRejectJobById = () => {
  const { fetchApi, isLoading } = useApi<
    AdminRejectJobByIdParams,
    AdminRejectJobByIdResponse,
    AdminRejectJobByIdError
  >(
    'adminRejectJobById',
    ({ jobId }) => ({
      method: 'DELETE',
      url: `/api/recruitments/admin/${jobId}`,
    }),
    {
      onError: () => {
        toast.error('Ẩn công việc thất bại');
      },
      onSuccess: () => {
        toast.success('Ẩn công việc thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useAdminRejectJobById;
