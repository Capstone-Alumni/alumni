import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
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
  const resetParams = useResetRecoilState(getMemberListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    GetMemberListDataParams,
    GetMemberListDataResponse,
    GetMemberListDataError
  >(
    'getMemberList',
    ({ page, limit, name }) => ({
      method: 'GET',
      url: '/api/members',
      params: {
        page,
        limit,
        name,
      },
    }),
    {
      revalidate: false,
    },
  );

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
    getMemberList: fetchApi,
    reload,
  };
};

export default useGetMemberList;
