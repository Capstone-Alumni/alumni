import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getOwnerEventListParamsAtom } from '../states';
import { Event, GetOwnerEventListParams } from '../types';

type OwnerGetEventListParams = GetOwnerEventListParams;

type OwnerGetEventListResponse = {
  data: {
    totalItems: number;
    items: Event[];
    itemPerPage: number;
  };
  status: true;
};

type OwnerGetEventListError = AxiosError;

const useOwnerGetEventList = () => {
  const params = useRecoilValue(getOwnerEventListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    OwnerGetEventListParams,
    OwnerGetEventListResponse,
    OwnerGetEventListError
  >('ownerGetEventList', params => ({
    method: 'GET',
    url: '/api/events/owner',
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

export default useOwnerGetEventList;
