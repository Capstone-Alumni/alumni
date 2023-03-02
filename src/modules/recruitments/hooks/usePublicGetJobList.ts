import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getPublicJobListParamsAtom } from '../states';
import { GetPublicJobListParams, Job } from '../types';

type PublicGetJobListParams = GetPublicJobListParams;

type PublicGetJobListResponse = {
  data: {
    totalItems: number;
    items: Job[];
    itemPerPage: number;
  };
  status: true;
};

type PublicGetJobListError = AxiosError;

const usePublicGetJobList = () => {
  const params = useRecoilValue(getPublicJobListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    PublicGetJobListParams,
    PublicGetJobListResponse,
    PublicGetJobListError
  >('publicGetJobList', params => ({
    method: 'GET',
    url: '/api/recruitments/public',
    params,
  }));

  useEffect(() => {
    fetchApi(params);
  }, [params]);

  const reload = () => {
    fetchApi(params);
  };

  return {
    isLoading,
    fetchApi,
    data,
    reload,
  };
};

export default usePublicGetJobList;
