import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type WithdrawRequestJoinClassDataParams = {
  requestId: string;
};

type WithdrawRequestJoinClassDataResponse = unknown;

type WithdrawRequestJoinClassDataError = AxiosError<{ message: string }>;

const useWithdrawRequestJoinClass = () => {
  const { fetchApi, isLoading } = useApi<
    WithdrawRequestJoinClassDataParams,
    WithdrawRequestJoinClassDataResponse,
    WithdrawRequestJoinClassDataError
  >(
    'WithdrawRequestJoinClass',
    ({ requestId }) => ({
      method: 'DELETE',
      url: `/api/access_requests/${requestId}`,
    }),
    {
      onError: ({ response }) => {
        if (response?.data?.message?.includes('non exist')) {
          toast.error('Yêu cầu không tồn tại');
        } else {
          toast.error('Xảy ra lỗi');
        }
      },
      onSuccess: () => {
        toast.success('Rút lại yêu cầu thành công');
      },
    },
  );

  return {
    isLoading,
    withdrawRequestJoinClass: fetchApi,
  };
};

export default useWithdrawRequestJoinClass;
