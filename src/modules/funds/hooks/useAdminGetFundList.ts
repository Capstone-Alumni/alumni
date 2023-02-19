import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getAdminFundListParamsAtom } from '../states';
import { Fund, GetAdminFundListParams } from '../types';

export type AdminGetFundListData = {
  totalItems: number;
  items: Fund[];
  itemPerPage: number;
};

type AdminGetFundListParams = GetAdminFundListParams;

type AdminGetFundListResponse = {
  data: AdminGetFundListData;
  status: true;
};

type AdminGetFundListError = AxiosError;

const useAdminGetFundList = () => {
  const params = useRecoilValue(getAdminFundListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    AdminGetFundListParams,
    AdminGetFundListResponse,
    AdminGetFundListError
  >('adminGetFundList', params => ({
    method: 'GET',
    url: '/api/funds/admin',
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

export default useAdminGetFundList;
