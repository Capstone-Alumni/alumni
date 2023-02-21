import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type AdminApproveEventByIdParams = {
  eventId: string;
};

type AdminApproveEventByIdResponse = unknown;

type AdminApproveEventByIdError = AxiosError;

const useAdminApproveEventById = () => {
  const { fetchApi, isLoading } = useApi<
    AdminApproveEventByIdParams,
    AdminApproveEventByIdResponse,
    AdminApproveEventByIdError
  >(
    'adminApproveEventById',
    ({ eventId }) => ({
      method: 'PUT',
      url: `/api/events/admin/${eventId}`,
    }),
    {
      onError: () => {
        toast.error('Xác nhận thất bại');
      },
      onSuccess: () => {
        toast.success('Xác nhận thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useAdminApproveEventById;
