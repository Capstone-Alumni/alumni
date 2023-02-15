import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';

type GetOwnerGetEventByIdParams = {
  eventId: string;
};

type GetOwnerGetEventByIdResponse = unknown;

type GetOwnerGetEventByIdError = AxiosError;

const useOwnerGetEventById = () => {
  const { fetchApi, isLoading } = useApi<
    GetOwnerGetEventByIdParams,
    GetOwnerGetEventByIdResponse,
    GetOwnerGetEventByIdError
  >('ownerGetEventById', ({ eventId }) => ({
    method: 'GET',
    url: `/api/events/owner/${eventId}`,
  }));

  return {
    isLoading,
    fetchApi,
  };
};

export default useOwnerGetEventById;
