import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type CreateFundTransactionParams = {
  fundId: string;
  amount: number;
  incognito: boolean;
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
    ({ fundId, incognito, ...data }) => ({
      method: 'POST',
      url: '/api/funds/create_transaction_url',
      data: {
        ...data,
        fundId,
        incognito,
        orderDescription: `dong gop cho quy ${fundId} so tien ${data.amount}`,
        orderType: 250000,
      },
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi');
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
