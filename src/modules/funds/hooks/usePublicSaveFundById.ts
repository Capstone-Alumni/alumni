import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type PublicSaveFundByIdParams = {
  fundId: string;
};

type PublicSaveFundByIdResponse = unknown;

type PublicSaveFundByIdError = AxiosError;

const usePublicSaveFundById = () => {
  const { fetchApi, isLoading } = useApi<
    PublicSaveFundByIdParams,
    PublicSaveFundByIdResponse,
    PublicSaveFundByIdError
  >(
    'publicSaveFundById',
    ({ fundId }) => ({
      method: 'POST',
      url: `/api/funds/public/${fundId}/saved`,
    }),
    {
      onError: () => {
        toast.error('Lưu quỹ thất bại');
      },
      onSuccess: () => {
        toast.success('Lưu quỹ thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default usePublicSaveFundById;
