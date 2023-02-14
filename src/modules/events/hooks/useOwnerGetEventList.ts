import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { GetOwnerEventListParams } from '../types';

type OwnerGetEventListParams = GetOwnerEventListParams;

type OwnerGetEventListResponse = unknown;

type OwnerGetEventListError = AxiosError;

const useOwnerGetEventList = () => {
  const { fetchApi, isLoading } = useApi<
    OwnerGetEventListParams,
    OwnerGetEventListResponse,
    OwnerGetEventListError
  >('ownerGetEventList', params => ({
    method: 'GET',
    url: '/api/events/owner',
    params,
  }));

  return {
    isLoading,
    fetchApi,
  };
};

export default useOwnerGetEventList;
