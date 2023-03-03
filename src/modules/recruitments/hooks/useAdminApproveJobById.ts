import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type AdminApproveJobByIdParams = {
  jobId: string;
};

type AdminApproveJobByIdResponse = unknown;

type AdminApproveJobByIdError = AxiosError;

const useAdminApproveJobById = () => {
  const { fetchApi, isLoading } = useApi<
    AdminApproveJobByIdParams,
    AdminApproveJobByIdResponse,
    AdminApproveJobByIdError
  >(
    'adminApproveJobById',
    ({ jobId }) => ({
      method: 'PUT',
      url: `/api/recruitments/admin/${jobId}`,
    }),
    {
      onError: () => {
        toast.error('Xác nhận thất bại');
      },
      onSuccess: () => {
        toast.success('Xác nhận thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useAdminApproveJobById;
