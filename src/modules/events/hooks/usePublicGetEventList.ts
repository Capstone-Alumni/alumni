import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { GetPublicEventListParams } from '../types';

type PublicGetEventListParams = GetPublicEventListParams;

type PublicGetEventListResponse = unknown;

type PublicGetEventListError = AxiosError;

const usePublicGetEventList = () => {
  const { fetchApi, isLoading } = useApi<
    PublicGetEventListParams,
    PublicGetEventListResponse,
    PublicGetEventListError
  >('publicGetEventList', params => ({
    method: 'GET',
    url: '/api/events/public',
    params,
  }));

  return {
    isLoading,
    fetchApi,
  };
};

export default usePublicGetEventList;
