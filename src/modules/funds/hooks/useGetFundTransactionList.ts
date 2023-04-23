import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getFundTransactionListParamsAtom } from '../states';
import {
  FundTransaction,
  GetFundTransactionListParams as GetFundTransactionListParamsGeneral,
} from '../types';

type GetFundTransactionListParams = GetFundTransactionListParamsGeneral & {
  fundId: string;
};

type GetFundTransactionListResponse = {
  data: {
    totalItems: number;
    items: FundTransaction[];
    itemPerPage: number;
  };
  status: true;
};

type GetFundTransactionListError = AxiosError;

const useGetFundTransactionList = (fundId: string) => {
  const params = useRecoilValue(getFundTransactionListParamsAtom);
  const resetParams = useResetRecoilState(getFundTransactionListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    GetFundTransactionListParams,
    GetFundTransactionListResponse,
    GetFundTransactionListError
  >('GetFundTransactionList', ({ ...params }) => ({
    method: 'GET',
    url: `/api/funds/public/${fundId}/transactions`,
    params,
  }));

  useEffect(() => resetParams, []);

  useEffect(() => {
    fetchApi({ ...params, fundId });
  }, [params]);

  const reload = () => {
    fetchApi({ ...params, fundId });
  };

  return {
    isLoading,
    fetchApi,
    data,
    reload,
  };
};

export default useGetFundTransactionList;
