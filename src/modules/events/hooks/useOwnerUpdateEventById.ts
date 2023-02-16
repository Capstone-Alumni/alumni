import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { EventFormValues } from '../components/EventForm';

type OwnerUpdateEventByIdParams = {
  eventId: string;
} & EventFormValues;

type OwnerUpdateEventByIdResponse = unknown;

type OwnerUpdateEventByIdError = AxiosError;

const useOwnerUpdateEventById = () => {
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
        toast.error('Cập nhập sự kiện thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhập sự kiện thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useOwnerUpdateEventById;
