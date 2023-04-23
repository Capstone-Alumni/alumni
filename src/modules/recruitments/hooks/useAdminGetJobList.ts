import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getAdminJobListParamsAtom } from '../states';
import { GetAdminJobListParams, Job } from '../types';

export type AdminGetJobListData = {
  totalItems: number;
  items: Job[];
  itemPerPage: number;
};

type AdminGetJobListParams = GetAdminJobListParams;

type AdminGetJobListResponse = {
  data: AdminGetJobListData;
  status: true;
};

type AdminGetJobListError = AxiosError;

const useAdminGetJobList = () => {
  const params = useRecoilValue(getAdminJobListParamsAtom);
  const resetParams = useResetRecoilState(getAdminJobListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    AdminGetJobListParams,
    AdminGetJobListResponse,
    AdminGetJobListError
  >('adminGetJobList', params => ({
    method: 'GET',
    url: '/api/recruitments/admin',
    params,
  }));

  useEffect(() => resetParams, []);

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

export default useAdminGetJobList;
