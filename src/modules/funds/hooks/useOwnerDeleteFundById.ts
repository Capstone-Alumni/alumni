import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type OwnerDeleteFundByIdParams = {
  fundId: string;
};

type OwnerDeleteFundByIdResponse = unknown;

type OwnerDeleteFundByIdError = AxiosError;

const useOwnerDeleteFundById = () => {
  const { fetchApi, isLoading } = useApi<
    OwnerDeleteFundByIdParams,
    OwnerDeleteFundByIdResponse,
    OwnerDeleteFundByIdError
  >(
    'ownerDeleteFundById',
    ({ fundId }) => ({
      method: 'DELETE',
      url: `/api/funds/owner/${fundId}`,
    }),
    {
      onError: () => {
        toast.error('Xoá quỹ thất bại');
      },
      onSuccess: () => {
        toast.success('Xoá quỹ thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useOwnerDeleteFundById;
