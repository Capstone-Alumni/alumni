import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { FundFormValues } from '../components/FundForm';

type CreateFundParams = FundFormValues;

type CreateFundResponse = unknown;

type CreateFundError = AxiosError;

const useCreateFund = () => {
  const router = useRouter();

  const { fetchApi, isLoading } = useApi<
    CreateFundParams,
    CreateFundResponse,
    CreateFundError
  >(
    'createFund',
    data => ({
      method: 'POST',
      url: '/api/funds/owner',
      data: data,
    }),
    {
      onError: () => {
        toast.error('Tạo quỹ thất bại');
      },
      onSuccess: () => {
        toast.success('Tạo quỹ thành công');
        router.push('/admin/action/funds');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useCreateFund;
