import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getOwnerJobListParamsAtom } from '../states';
import { GetOwnerJobListParams, Job } from '../types';

type OwnerGetJobListParams = GetOwnerJobListParams;

type OwnerGetJobListResponse = {
  data: {
    totalItems: number;
    items: Job[];
    itemPerPage: number;
  };
  status: true;
};

type OwnerGetJobListError = AxiosError;

const useOwnerGetJobList = () => {
  const params = useRecoilValue(getOwnerJobListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    OwnerGetJobListParams,
    OwnerGetJobListResponse,
    OwnerGetJobListError
  >('ownerGetJobList', params => ({
    method: 'GET',
    url: '/api/recruitments/owner',
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

export default useOwnerGetJobList;
