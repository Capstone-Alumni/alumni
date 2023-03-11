import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getUserGetAppliedJobListParamsAtom } from '../states';
import { GetUserAppliedJobListParams, JobApplierInfo } from '../types';

type UserGetAppliedJobListParams = GetUserAppliedJobListParams;

type UserGetAppliedJobListResponse = {
  data: {
    totalItems: number;
    items: JobApplierInfo[];
    itemPerPage: number;
  };
  status: true;
};

type UserGetAppliedJobListError = AxiosError;

const useUserGetAppliedJobList = () => {
  const params = useRecoilValue(getUserGetAppliedJobListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    UserGetAppliedJobListParams,
    UserGetAppliedJobListResponse,
    UserGetAppliedJobListError
  >('UserGetAppliedJobList', params => ({
    method: 'GET',
    url: '/api/recruitments/user',
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

export default useUserGetAppliedJobList;
