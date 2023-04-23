import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getPublicEndedFundListParamsAtom } from '../states';
import { Fund, GetPublicFundListParams } from '../types';

type PublicGetEndedFundListParams = GetPublicFundListParams;

type PublicGetEndedFundListResponse = {
  data: {
    totalItems: number;
    items: Fund[];
    itemPerPage: number;
  };
  status: true;
};

type PublicGetEndedFundListError = AxiosError;

const usePublicGetEndedFundList = () => {
  const params = useRecoilValue(getPublicEndedFundListParamsAtom);
  const resetParams = useResetRecoilState(getPublicEndedFundListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    PublicGetEndedFundListParams,
    PublicGetEndedFundListResponse,
    PublicGetEndedFundListError
  >('publicGetEndedFundList', params => ({
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

export default usePublicGetEndedFundList;
