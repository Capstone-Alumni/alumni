import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';

type GetPublicGetEventByIdParams = {
  eventId: string;
};

type GetPublicGetEventByIdResponse = unknown;

type GetPublicGetEventByIdError = AxiosError;

const usePublicGetEventById = () => {
  const { fetchApi, isLoading } = useApi<
    GetPublicGetEventByIdParams,
    GetPublicGetEventByIdResponse,
    GetPublicGetEventByIdError
  >('publicGetEventById', ({ eventId }) => ({
    method: 'GET',
    url: `/api/events/public/${eventId}`,
  }));

  return {
    isLoading,
    fetchApi,
  };
};

export default usePublicGetEventById;
