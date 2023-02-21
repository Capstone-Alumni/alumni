import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { EventFormValues } from '../components/EventForm';

type CreateEventParams = EventFormValues;

type CreateEventResponse = unknown;

type CreateEventError = AxiosError;

const useCreateEvent = () => {
  const router = useRouter();

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
        router.push('/events/hosting');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useCreateEvent;
