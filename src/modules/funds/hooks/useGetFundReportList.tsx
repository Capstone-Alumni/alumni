import { AxiosError } from 'axios';
import { useEffect } from 'react';
import useApi from 'src/modules/share/hooks/useApi';
import { FundReport } from '../types';

type GetFundReportListParams = never;

type GetFundReportListResponse = {
  data: {
    totalItems: number;
    items: FundReport[];
    itemPerPage: number;
  };
  status: true;
};

type GetFundReportListError = AxiosError;

const useGetFundReportList = (fundId: string) => {
  const { fetchApi, data, isLoading } = useApi<
    GetFundReportListParams,
    GetFundReportListResponse,
    GetFundReportListError
  >('GetFundReportList', () => ({
    method: 'GET',
    url: `/api/funds/owner/${fundId}/reports`,
  }));

  useEffect(() => {
    if (!data && !isLoading) {
      fetchApi();
    }
  }, []);

  return {
    isLoading,
    fetchApi,
    data,
  };
};

export default useGetFundReportList;
