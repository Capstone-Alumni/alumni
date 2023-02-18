import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type PublicJoinEventByIdParams = {
  eventId: string;
};

type PublicJoinEventByIdResponse = unknown;

type PublicJoinEventByIdError = AxiosError;

const usePublicJoinEventById = () => {
  const { fetchApi, isLoading } = useApi<
    PublicJoinEventByIdParams,
    PublicJoinEventByIdResponse,
    PublicJoinEventByIdError
  >(
    'publicJoinEventById',
    ({ eventId }) => ({
      method: 'POST',
      url: `/api/events/public/${eventId}/participants`,
    }),
    {
      onError: () => {
        toast.error('Tham gia sự kiện thất bại');
      },
      onSuccess: () => {
        toast.success('Tham gia sự kiện thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default usePublicJoinEventById;
