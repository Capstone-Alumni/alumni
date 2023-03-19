import { AxiosError } from 'axios';
import { useEffect } from 'react';
import useApi from 'src/modules/share/hooks/useApi';
import { AccessRequest } from 'src/modules/verifyAccount/types';

type GetAccessStatusParams = never;

type GetAccessStatusResponse = {
  data: {
    accessStatus: 'PENDING' | 'APPROVED';
    accessRequest: AccessRequest;
  };
};

type GetAccessStatusError = AxiosError;

const useGetAccessStatus = () => {
  const { fetchApi, data, isLoading } = useApi<
    GetAccessStatusParams,
    GetAccessStatusResponse,
    GetAccessStatusError
  >('AccessStatus', () => ({
    method: 'GET',
    url: '/api/access_status',
  }));

  useEffect(() => {
    if (!data) {
      fetchApi();
    }
  }, []);

  return {
    data,
    isLoading,
    fetchApi,
  };
};

export default useGetAccessStatus;
