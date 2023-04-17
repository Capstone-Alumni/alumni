import { useEffect } from 'react';
import useApi from 'src/modules/share/hooks/useApi';
import { AccessRequest } from '../types';

type GetOwnedAccessRequestListResponse = {
  data: {
    totalItems: number;
    itemPerPage: number;
    items: AccessRequest[];
  };
};

type GetOwnedAccessRequestListError = unknown;

const useGetOwnedAccessRequestList = () => {
  const { fetchApi, data, isLoading } = useApi<
    unknown,
    GetOwnedAccessRequestListResponse,
    GetOwnedAccessRequestListError
  >('getOwnedAccessRequestList', () => ({
    method: 'GET',
    url: '/api/access_requests/owned',
    params: {
      page: 1,
      limit: 999,
    },
  }));

  useEffect(() => {
    fetchApi();
  }, []);

  const reload = () => {
    fetchApi();
  };

  return {
    data,
    isLoading,
    getOwnedAccessRequestListList: fetchApi,
    reload,
  };
};

export default useGetOwnedAccessRequestList;
