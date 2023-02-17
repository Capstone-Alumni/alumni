import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type AdminRejectEventByIdParams = {
  eventId: string;
};

type AdminRejectEventByIdResponse = unknown;

type AdminRejectEventByIdError = AxiosError;

const useAdminRejectEventById = () => {
  const { fetchApi, isLoading } = useApi<
    AdminRejectEventByIdParams,
    AdminRejectEventByIdResponse,
    AdminRejectEventByIdError
  >(
    'adminRejectEventById',
    ({ eventId }) => ({
      method: 'DELETE',
      url: `/api/events/admin/${eventId}`,
    }),
    {
      onError: () => {
        toast.error('Huỷ sự kiện thất bại');
      },
      onSuccess: () => {
        toast.success('Huỷ sự kiện thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useAdminRejectEventById;
