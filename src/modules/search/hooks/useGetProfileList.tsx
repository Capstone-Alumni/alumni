import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getProfileListParamsAtom } from '../states';
import { GetProfileListParams } from '../types';
import { Alumni } from '@share/states';

export type GetProfileListData = {
  totalItems: number;
  items: Alumni[];
  itemPerPage: number;
};

type GetProfileListResponse = {
  data: GetProfileListData;
  status: true;
};

type GetProfileListError = AxiosError;

const useGetProfileList = () => {
  const params = useRecoilValue(getProfileListParamsAtom);
  const resetParams = useResetRecoilState(getProfileListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    GetProfileListParams,
    GetProfileListResponse,
    GetProfileListError
  >('GetProfileList', params => ({
    method: 'GET',
    url: '/api/users',
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

export default useGetProfileList;
