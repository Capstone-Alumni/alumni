import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type RejcetAccessRequestParams = {
  id: string;
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
    ({ id }) => ({
      method: 'PUT',
      url: `/api/access_requests/${id}/reject`,
    }),
    {
      onError: () => {
        toast.error('Xảy ra lỗi');
      },
      onSuccess: () => {
        toast.info('Yêu cầu đã bị từ chối');
      },
    },
  );

  return {
    isLoading,
    reject: fetchApi,
  };
};

export default useRejcetAccessRequest;
