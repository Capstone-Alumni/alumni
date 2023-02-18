import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type PublicInterestEventByIdParams = {
  eventId: string;
};

type PublicInterestEventByIdResponse = unknown;

type PublicInterestEventByIdError = AxiosError;

const usePublicInterestEventById = () => {
  const { fetchApi, isLoading } = useApi<
    PublicInterestEventByIdParams,
    PublicInterestEventByIdResponse,
    PublicInterestEventByIdError
  >(
    'publicInterestEventById',
    ({ eventId }) => ({
      method: 'POST',
      url: `/api/events/public/${eventId}/interest`,
    }),
    {
      onError: () => {
        toast.error('Lưu sự kiện thất bại');
      },
      onSuccess: () => {
        toast.success('Lưu sự kiện thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default usePublicInterestEventById;
