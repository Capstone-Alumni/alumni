import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getOwnerFundListParamsAtom } from '../states';
import { Fund, GetOwnerFundListParams } from '../types';

type OwnerGetFundListParams = GetOwnerFundListParams;

type OwnerGetFundListResponse = {
  data: {
    totalItems: number;
    items: Fund[];
    itemPerPage: number;
  };
  status: true;
};

type OwnerGetFundListError = AxiosError;

const useOwnerGetFundList = () => {
  const params = useRecoilValue(getOwnerFundListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    OwnerGetFundListParams,
    OwnerGetFundListResponse,
    OwnerGetFundListError
  >('ownerGetFundList', params => ({
    method: 'GET',
    url: '/api/funds/owner',
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

export default useOwnerGetFundList;
