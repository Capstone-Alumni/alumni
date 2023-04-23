import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getAdminReportListParamsAtom } from '../states';
import { GetAdminReportListParams, Report } from '../types';

export type AdminGetReportListData = {
  totalItems: number;
  items: Report[];
  itemPerPage: number;
};

type AdminGetReportListParams = GetAdminReportListParams;

type AdminGetReportListResponse = {
  data: AdminGetReportListData;
  status: true;
};

type AdminGetReportListError = AxiosError;

const useAdminGetReportList = () => {
  const params = useRecoilValue(getAdminReportListParamsAtom);
  const resetParams = useResetRecoilState(getAdminReportListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    AdminGetReportListParams,
    AdminGetReportListResponse,
    AdminGetReportListError
  >('adminGetReportList', params => ({
    method: 'GET',
    url: '/api/reports',
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

export default useAdminGetReportList;
