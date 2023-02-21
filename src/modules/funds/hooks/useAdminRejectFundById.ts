import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type AdminRejectFundByIdParams = {
  fundId: string;
};

type AdminRejectFundByIdResponse = unknown;

type AdminRejectFundByIdError = AxiosError;

const useAdminRejectFundById = () => {
  const { fetchApi, isLoading } = useApi<
    AdminRejectFundByIdParams,
    AdminRejectFundByIdResponse,
    AdminRejectFundByIdError
  >(
    'adminRejectFundById',
    ({ fundId }) => ({
      method: 'DELETE',
      url: `/api/funds/admin/${fundId}`,
    }),
    {
      onError: () => {
        toast.error('Huỷ yêu cầu thất bại');
      },
      onSuccess: () => {
        toast.success('Huỷ yêu cầu thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useAdminRejectFundById;
