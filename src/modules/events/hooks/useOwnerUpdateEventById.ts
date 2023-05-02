import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { EventFormValues } from '../components/EventForm';

type OwnerUpdateEventByIdParams = {
  eventId: string;
} & EventFormValues;

type OwnerUpdateEventByIdResponse = unknown;

type OwnerUpdateEventByIdError = AxiosError;

const useOwnerUpdateEventById = () => {
  const router = useRouter();

  const { fetchApi, isLoading } = useApi<
    OwnerUpdateEventByIdParams,
    OwnerUpdateEventByIdResponse,
    OwnerUpdateEventByIdError
  >(
    'ownerUpdateEventById',
    ({ eventId, ...data }) => ({
      method: 'PUT',
      url: `/api/events/owner/${eventId}`,
      data: data,
    }),
    {
      onError: () => {
        toast.error('Cập nhật sự kiện thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhật sự kiện thành công');
        router.push('/admin/action/event');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useOwnerUpdateEventById;
