import { useEffect } from 'react';
import useApi from 'src/modules/share/hooks/useApi';
import { AccessRequest } from '../types';

type GetPendingAccessRequestListParams = unknown;

type GetPendingAccessRequestListResponse = {
  data: {
    totalItems: number;
    itemPerPage: number;
    items: AccessRequest[];
  };
};

type GetPendingAccessRequestListError = unknown;

const useGetPendingAccessRequestList = () => {
  const { fetchApi, data, isLoading } = useApi<
    GetPendingAccessRequestListParams,
    GetPendingAccessRequestListResponse,
    GetPendingAccessRequestListError
  >('getPendingAccessRequestList', () => ({
    method: 'GET',
    url: '/api/access_requests',
    params: {
      page: 1,
      limit: 1,
      status: '0',
    },
  }));

  useEffect(() => {
    fetchApi();
  }, []);

  return {
    data,
    isLoading,
    getPendingAccessRequestListList: fetchApi,
  };
};

export default useGetPendingAccessRequestList;
