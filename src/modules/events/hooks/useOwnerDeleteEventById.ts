import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type OwnerDeleteEventByIdParams = {
  eventId: string;
};

type OwnerDeleteEventByIdResponse = unknown;

type OwnerDeleteEventByIdError = AxiosError;

const useOwnerDeleteEventById = () => {
  const { fetchApi, isLoading } = useApi<
    OwnerDeleteEventByIdParams,
    OwnerDeleteEventByIdResponse,
    OwnerDeleteEventByIdError
  >(
    'ownerDeleteEventById',
    ({ eventId }) => ({
      method: 'DELETE',
      url: `/api/events/owner/${eventId}`,
    }),
    {
      onError: () => {
        toast.error('Xoá sự kiện thất bại');
      },
      onSuccess: () => {
        toast.success('Xoá sự kiện thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useOwnerDeleteEventById;
