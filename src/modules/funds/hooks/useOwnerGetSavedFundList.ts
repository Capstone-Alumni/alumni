import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getOwnerSavedFundListParamsAtom } from '../states';
import { Fund, GetOwnerSavedFundListParams } from '../types';

type OwnerGetSavedFundListParams = GetOwnerSavedFundListParams;

type OwnerGetSavedFundListResponse = {
  data: {
    totalItems: number;
    items: Fund[];
    itemPerPage: number;
  };
  status: true;
};

type OwnerGetSavedFundListError = AxiosError;

const useOwnerGetSavedFundList = () => {
  const params = useRecoilValue(getOwnerSavedFundListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    OwnerGetSavedFundListParams,
    OwnerGetSavedFundListResponse,
    OwnerGetSavedFundListError
  >('ownerGetSavedFundList', params => ({
    method: 'GET',
    url: '/api/funds/owner/saved',
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

export default useOwnerGetSavedFundList;
