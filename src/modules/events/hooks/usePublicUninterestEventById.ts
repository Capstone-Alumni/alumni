import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type PublicUninterestEventByIdParams = {
  eventId: string;
};

type PublicUninterestEventByIdResponse = unknown;

type PublicUninterestEventByIdError = AxiosError;

const usePublicUninterestEventById = () => {
  const { fetchApi, isLoading } = useApi<
    PublicUninterestEventByIdParams,
    PublicUninterestEventByIdResponse,
    PublicUninterestEventByIdError
  >(
    'publicUninterestEventById',
    ({ eventId }) => ({
      method: 'DELETE',
      url: `/api/events/public/${eventId}/interest`,
    }),
    {
      onError: () => {
        toast.error('Bỏ lưu sự kiện thất bại');
      },
      onSuccess: () => {
        toast.success('Bỏ lưu sự kiện thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default usePublicUninterestEventById;
