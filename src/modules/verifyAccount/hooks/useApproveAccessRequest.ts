import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type ApproveAccessRequestParams = {
  id: string;
};

type ApproveAccessRequestResponse = unknown;

type ApproveAccessRequestError = unknown;

const useApproveAccessRequest = () => {
  const { fetchApi, isLoading } = useApi<
    ApproveAccessRequestParams,
    ApproveAccessRequestResponse,
    ApproveAccessRequestError
  >(
    'approveAccessRequest',
    ({ id }) => ({
      method: 'PUT',
      url: `/api/access_requests/${id}/approve`,
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi');
      },
      onSuccess: () => {
        toast.info('Yêu cầu đã được chấp nhận');
      },
    },
  );

  return {
    isLoading,
    approve: fetchApi,
  };
};

export default useApproveAccessRequest;
