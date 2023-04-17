import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type RequestJoinClassDataParams = {
  alumClassId: string;
};

type RequestJoinClassDataResponse = unknown;

type RequestJoinClassDataError = AxiosError<{ message: string }>;

const useRequestJoinClass = () => {
  const { fetchApi, isLoading } = useApi<
    RequestJoinClassDataParams,
    RequestJoinClassDataResponse,
    RequestJoinClassDataError
  >(
    'RequestJoinClass',
    ({ alumClassId }) => ({
      method: 'POST',
      url: '/api/access_requests',
      data: {
        alumClassId,
      },
    }),
    {
      onError: ({ response }) => {
        if (response?.data?.message?.includes('exist')) {
          toast.error('Yêu cầu đã tồn tại');
        }
      },
    },
  );

  return {
    isLoading,
    requestJoinClass: fetchApi,
  };
};

export default useRequestJoinClass;
