import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { EventFormValues } from '../components/EventForm';

type CreateEventParams = EventFormValues;

type CreateEventResponse = unknown;

type CreateEventError = AxiosError;

const useCreateEvent = () => {
  const { fetchApi, isLoading } = useApi<
    CreateEventParams,
    CreateEventResponse,
    CreateEventError
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

export default useCreateEvent;
