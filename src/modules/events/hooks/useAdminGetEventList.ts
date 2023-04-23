import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getAdminEventListParamsAtom } from '../states';
import { Event, GetAdminEventListParams } from '../types';

export type AdminGetEventListData = {
  totalItems: number;
  items: Event[];
  itemPerPage: number;
};

type AdminGetEventListParams = GetAdminEventListParams;

type AdminGetEventListResponse = {
  data: AdminGetEventListData;
  status: true;
};

type AdminGetEventListError = AxiosError;

const useAdminGetEventList = () => {
  const params = useRecoilValue(getAdminEventListParamsAtom);
  const resetParams = useResetRecoilState(getAdminEventListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    AdminGetEventListParams,
    AdminGetEventListResponse,
    AdminGetEventListError
  >('adminGetEventList', params => ({
    method: 'GET',
    url: '/api/events/admin',
    params,
  }));

  useEffect(() => {
    return resetParams;
  });

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

export default useAdminGetEventList;
