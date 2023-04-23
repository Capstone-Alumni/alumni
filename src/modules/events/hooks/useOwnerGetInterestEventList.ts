import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getOwnerInterestEventListParamsAtom } from '../states';
import { Event, GetOwnerInterestEventListParams } from '../types';

type OwnerGetInterestEventListParams = GetOwnerInterestEventListParams;

type OwnerGetInterestEventListResponse = {
  data: {
    totalItems: number;
    items: Event[];
    itemPerPage: number;
  };
  status: true;
};

type OwnerGetInterestEventListError = AxiosError;

const useOwnerGetInterestEventList = () => {
  const params = useRecoilValue(getOwnerInterestEventListParamsAtom);
  const resetParams = useResetRecoilState(getOwnerInterestEventListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    OwnerGetInterestEventListParams,
    OwnerGetInterestEventListResponse,
    OwnerGetInterestEventListError
  >('ownerGetInterestEventList', params => ({
    method: 'GET',
    url: '/api/events/owner/interest',
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

export default useOwnerGetInterestEventList;
