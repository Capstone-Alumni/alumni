import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type PublicUnsaveFundByIdParams = {
  fundId: string;
};

type PublicUnsaveFundByIdResponse = unknown;

type PublicUnsaveFundByIdError = AxiosError;

const usePublicUnsaveFundById = () => {
  const { fetchApi, isLoading } = useApi<
    PublicUnsaveFundByIdParams,
    PublicUnsaveFundByIdResponse,
    PublicUnsaveFundByIdError
  >(
    'publicUnsaveFundById',
    ({ fundId }) => ({
      method: 'DELETE',
      url: `/api/funds/public/${fundId}/saved`,
    }),
    {
      onError: () => {
        toast.error('Bỏ lưu quỹ thất bại');
      },
      onSuccess: () => {
        toast.success('Bỏ lưu quỹ thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default usePublicUnsaveFundById;
