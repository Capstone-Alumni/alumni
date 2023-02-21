import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type AdminApproveFundByIdParams = {
  fundId: string;
};

type AdminApproveFundByIdResponse = unknown;

type AdminApproveFundByIdError = AxiosError;

const useAdminApproveFundById = () => {
  const { fetchApi, isLoading } = useApi<
    AdminApproveFundByIdParams,
    AdminApproveFundByIdResponse,
    AdminApproveFundByIdError
  >(
    'adminApproveFundById',
    ({ fundId }) => ({
      method: 'PUT',
      url: `/api/funds/admin/${fundId}`,
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

export default useAdminApproveFundById;
