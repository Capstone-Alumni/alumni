import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getFundReportListDataAtomFamily } from '../states';
import { FundReport } from '../types';

type GetFundReportListParams = never;

export type GetFundReportListResponse = {
  data: {
    totalItems: number;
    items: FundReport[];
    itemPerPage: number;
  };
  status: true;
};

type GetFundReportListError = AxiosError;

const useGetFundReportList = (fundId: string) => {
  const getFundReportListDataAtom = getFundReportListDataAtomFamily(fundId);
  const [data, setData] = useRecoilState(getFundReportListDataAtom);

  const { fetchApi, isLoading } = useApi<
    GetFundReportListParams,
    GetFundReportListResponse,
    GetFundReportListError
  >(
    `GetFundReportList/${fundId}`,
    () => ({
      method: 'GET',
      url: `/api/funds/owner/${fundId}/reports`,
    }),
    {
      onSuccess: res => {
        setData(res);
      },
    },
  );

  useEffect(() => {
    if (!data) {
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
