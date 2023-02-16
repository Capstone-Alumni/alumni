import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { Event } from '../types';

type GetPublicGetEventByIdParams = {
  eventId: string;
};

type GetPublicGetEventByIdResponse = {
  data: Event;
};

type GetPublicGetEventByIdError = AxiosError;

const usePublicGetEventById = () => {
  const { fetchApi, data, isLoading } = useApi<
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
    data,
  };
};

export default usePublicGetEventById;
