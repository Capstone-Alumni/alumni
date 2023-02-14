import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { GetAdminEventListParams } from '../types';

type AdminGetEventListParams = GetAdminEventListParams;

type AdminGetEventListResponse = unknown;

type AdminGetEventListError = AxiosError;

const useAdminGetEventList = () => {
  const { fetchApi, isLoading } = useApi<
    AdminGetEventListParams,
    AdminGetEventListResponse,
    AdminGetEventListError
  >('adminGetEventList', params => ({
    method: 'GET',
    url: '/api/events/admin',
    params,
  }));

  return {
    isLoading,
    fetchApi,
  };
};

export default useAdminGetEventList;
