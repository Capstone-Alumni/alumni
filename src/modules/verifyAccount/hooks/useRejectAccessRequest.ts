import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type RejcetAccessRequestParams = {
  id: string;
  message: string;
};

type RejcetAccessRequestResponse = unknown;

type RejcetAccessRequestError = unknown;

const useRejcetAccessRequest = () => {
  const { fetchApi, isLoading } = useApi<
    RejcetAccessRequestParams,
    RejcetAccessRequestResponse,
    RejcetAccessRequestError
  >(
    'rejcetAccessRequest',
    ({ id, message }) => ({
      method: 'PUT',
      url: `/api/access_requests/${id}/reject`,
      data: {
        message,
      },
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi');
      },
      onSuccess: () => {
        toast.info('Đã từ chối yêu cầu gia nhập');
      },
    },
  );

  return {
    isLoading,
    reject: fetchApi,
  };
};

export default useRejcetAccessRequest;
