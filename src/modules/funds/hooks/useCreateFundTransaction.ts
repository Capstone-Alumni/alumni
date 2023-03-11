import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type CreateFundTransactionParams = {
  fundId: string;
};

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
    ({ fundId, ...data }) => ({
      method: 'POST',
      url: '/api/funds/create_transaction_url',
      data: {
        ...data,
        fundId,
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
