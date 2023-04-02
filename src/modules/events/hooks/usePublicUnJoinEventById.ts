import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type PublicUnJoinEventByIdParams = {
  eventId: string;
};

type PublicUnJoinEventByIdResponse = unknown;

type PublicUnJoinEventByIdError = AxiosError;

const usePublicUnJoinEventById = () => {
  const { fetchApi, isLoading } = useApi<
    PublicUnJoinEventByIdParams,
    PublicUnJoinEventByIdResponse,
    PublicUnJoinEventByIdError
  >(
    'publicUnJoinEventById',
    ({ eventId }) => ({
      method: 'DELETE',
      url: `/api/events/public/${eventId}/participants`,
    }),
    {
      onError: () => {
        toast.error('Huỷ tham gia sự kiện thất bại');
      },
      onSuccess: () => {
        toast.success('Huỷ tham gia sự kiện thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default usePublicUnJoinEventById;
