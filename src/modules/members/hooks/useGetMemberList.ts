import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getMemberListParamsAtom } from '../state';
import { GetMemberListData, GetMemberListParams } from '../types';

type GetMemberListDataParams = GetMemberListParams;

type GetMemberListDataResponse = {
  data: GetMemberListData;
  status: true;
};

type GetMemberListDataError = unknown;

const useGetMemberList = () => {
  const params = useRecoilValue(getMemberListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    GetMemberListDataParams,
    GetMemberListDataResponse,
    GetMemberListDataError
  >(
    'getMemberList',
    ({ page, limit, email, tenantId }) => ({
      method: 'GET',
      url: '/platformHost/api/members',
      params: {
        tenant_id: tenantId,
        page,
        limit,
        email,
      },
    }),
    {
      revalidate: false,
    },
  );

  useEffect(() => {
    if (params.tenantId) {
      fetchApi(params);
    }
  }, [params]);

  const reload = () => {
    fetchApi(params);
  };

  return {
    data,
    isLoading,
    getMemberList: fetchApi,
    reload,
  };
};

export default useGetMemberList;
