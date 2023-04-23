import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getOwnerGoingEventListParamsAtom } from '../states';
import { Event, GetOwnerGoingEventListParams } from '../types';

type OwnerGetGoingEventListParams = GetOwnerGoingEventListParams;

type OwnerGetGoingEventListResponse = {
  data: {
    totalItems: number;
    items: Event[];
    itemPerPage: number;
  };
  status: true;
};

type OwnerGetGoingEventListError = AxiosError;

const useOwnerGetGoingEventList = () => {
  const params = useRecoilValue(getOwnerGoingEventListParamsAtom);
  const resetParams = useResetRecoilState(getOwnerGoingEventListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    OwnerGetGoingEventListParams,
    OwnerGetGoingEventListResponse,
    OwnerGetGoingEventListError
  >('ownerGetGoingEventList', params => ({
    method: 'GET',
    url: '/api/events/owner/going',
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

export default useOwnerGetGoingEventList;
