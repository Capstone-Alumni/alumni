import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { FundFormValues } from '../components/FundForm';

type CreateFundTransactionParams = FundFormValues;

type CreateFundTransactionResponse = {
  data: string;
};

type CreateFundTransactionError = AxiosError;

const useCreateFundTransaction = () => {
  const { fetchApi, isLoading } = useApi<
    CreateFundTransactionParams,
    CreateFundTransactionResponse,
    CreateFundTransactionError
  >(
    'createFundTransaction',
    data => ({
      method: 'POST',
      url: '/api/create_Transaction_url',
      data: {
        ...data,
        amount: 100000,
        orderDescription:
          'Nap tien cho thue bao 0123456789. So tien 100,000 VND',
        orderType: 250000,
      },
    }),
    {
      onError: () => {
        toast.error('Yêu cầu tạo quỹ thất bại');
      },
      onSuccess: ({ data: vnpUrl }) => {
        // console.log(vnpUrl);
        window.open(vnpUrl, '_self');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useCreateFundTransaction;
