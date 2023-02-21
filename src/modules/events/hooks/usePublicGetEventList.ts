import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getPublicEventListParamsAtom } from '../states';
import { Event, GetPublicEventListParams } from '../types';

type PublicGetEventListParams = GetPublicEventListParams;

type PublicGetEventListResponse = {
  data: {
    totalItems: number;
    items: Event[];
    itemPerPage: number;
  };
  status: true;
};

type PublicGetEventListError = AxiosError;

const usePublicGetEventList = () => {
  const params = useRecoilValue(getPublicEventListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    PublicGetEventListParams,
    PublicGetEventListResponse,
    PublicGetEventListError
  >('publicGetEventList', params => ({
    method: 'GET',
    url: '/api/events/public',
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

export default usePublicGetEventList;
