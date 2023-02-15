import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';

type GetAdminGetEventByIdParams = {
  eventId: string;
};

type GetAdminGetEventByIdResponse = unknown;

type GetAdminGetEventByIdError = AxiosError;

const useAdminGetEventById = () => {
  const { fetchApi, isLoading } = useApi<
    GetAdminGetEventByIdParams,
    GetAdminGetEventByIdResponse,
    GetAdminGetEventByIdError
  >('adminGetEventById', ({ eventId }) => ({
    method: 'GET',
    url: `/api/events/admin/${eventId}`,
  }));

  return {
    isLoading,
    fetchApi,
  };
};

export default useAdminGetEventById;
