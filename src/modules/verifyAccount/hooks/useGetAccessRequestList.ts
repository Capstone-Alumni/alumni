import { getAccessRequestListParamsAtom } from '../states';
import { useEffect } from 'react';
import useApi from 'src/modules/share/hooks/useApi';
import { AccessRequest, GetAccessRequestListParams } from '../types';
import { useRecoilValue, useResetRecoilState } from 'recoil';

type GetAccessRequestListResponse = {
  data: {
    totalItems: number;
    itemPerPage: number;
    items: AccessRequest[];
  };
};

type GetAccessRequestListError = unknown;

const useGetAccessRequestList = () => {
  const params = useRecoilValue(getAccessRequestListParamsAtom);
  const resetParams = useResetRecoilState(getAccessRequestListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    GetAccessRequestListParams,
    GetAccessRequestListResponse,
    GetAccessRequestListError
  >('getAccessRequestList', ({ page, limit, alumniId, name }) => ({
    method: 'GET',
    url: '/api/access_requests',
    params: {
      page,
      limit,
      alumniId,
      name,
    },
  }));

  useEffect(() => resetParams, []);

  useEffect(() => {
    fetchApi(params);
  }, [params]);

  const reload = () => {
    fetchApi(params);
  };

  return {
    data,
    isLoading,
    getAccessRequestListList: fetchApi,
    reload,
  };
};

export default useGetAccessRequestList;
