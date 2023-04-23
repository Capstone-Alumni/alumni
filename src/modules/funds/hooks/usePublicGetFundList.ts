import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getPublicFundListParamsAtom } from '../states';
import { Fund, GetPublicFundListParams } from '../types';

type PublicGetFundListParams = GetPublicFundListParams;

type PublicGetFundListResponse = {
  data: {
    totalItems: number;
    items: Fund[];
    itemPerPage: number;
  };
  status: true;
};

type PublicGetFundListError = AxiosError;

const usePublicGetFundList = () => {
  const params = useRecoilValue(getPublicFundListParamsAtom);
  const resetParams = useResetRecoilState(getPublicFundListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    PublicGetFundListParams,
    PublicGetFundListResponse,
    PublicGetFundListError
  >('publicGetFundList', params => ({
    method: 'GET',
    url: '/api/funds/public',
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

export default usePublicGetFundList;
