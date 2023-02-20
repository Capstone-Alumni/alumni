import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { Event } from '../types';

type GetOwnerGetEventByIdParams = {
  eventId: string;
};

type GetOwnerGetEventByIdResponse = {
  data: Event;
};

type GetOwnerGetEventByIdError = AxiosError;

const useOwnerGetEventById = () => {
  const { fetchApi, data, isLoading } = useApi<
    GetOwnerGetEventByIdParams,
    GetOwnerGetEventByIdResponse,
    GetOwnerGetEventByIdError
  >('ownerGetEventById', ({ eventId }) => ({
    method: 'GET',
    url: `/api/events/owner/${eventId}`,
  }));

  return {
    isLoading,
    data,
    fetchApi,
  };
};

export default useOwnerGetEventById;
