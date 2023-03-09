import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { FundFormValues } from '../components/FundForm';

type CreateFundPaymentParams = FundFormValues;

type CreateFundPaymentResponse = {
  data: string;
};

type CreateFundPaymentError = AxiosError;

const useCreateFundPayment = () => {
  const { fetchApi, isLoading } = useApi<
    CreateFundPaymentParams,
    CreateFundPaymentResponse,
    CreateFundPaymentError
  >(
    'createFundPayment',
    data => ({
      method: 'POST',
      url: '/api/create_payment_url',
      data: {
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
        console.log(vnpUrl);
        // window.open(vnpUrl, '_self');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useCreateFundPayment;
