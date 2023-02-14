import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type CreateEventByIdParams = never;

type CreateEventByIdResponse = unknown;

type CreateEventByIdError = AxiosError;

const useCreateEventById = () => {
  const { fetchApi, isLoading } = useApi<
    CreateEventByIdParams,
    CreateEventByIdResponse,
    CreateEventByIdError
  >(
    'createEvent',
    data => ({
      method: 'POST',
      url: '/api/events/owner',
      data: data,
    }),
    {
      onError: () => {
        toast.error('Yêu cầu tạo sự kiện thất bại');
      },
      onSuccess: () => {
        toast.success('Yêu cầu tạo sự kiện thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useCreateEventById;
