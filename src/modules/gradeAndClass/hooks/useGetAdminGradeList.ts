import { useEffect } from 'react';
import useEffectV2 from '@share/hooks/useEffectV2';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getAdminGradeListParamsAtom } from '../state';
import { GetAdminGradeListParams, GetGradeListData } from '../types';

type GetAdminGradeListDataParams = GetAdminGradeListParams;

type GetAdminGradeListDataResponse = {
  data: GetGradeListData;
  status: true;
};

type GetAdminGradeListDataError = unknown;

const useGetAdminGradeList = (alumniId: string) => {
  const params = useRecoilValue(getAdminGradeListParamsAtom);
  const resetParams = useResetRecoilState(getAdminGradeListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    GetAdminGradeListDataParams,
    GetAdminGradeListDataResponse,
    GetAdminGradeListDataError
  >(`getAdminGradeList/${alumniId}`, ({ page, limit, name, code }) => ({
    method: 'GET',
    url: '/api/grades',
    params: {
      page,
      limit,
      name,
      code,
      alumniId,
    },
  }));

  useEffect(() => resetParams, []);

  useEffect(() => {
    if (!data) {
      fetchApi(params);
    }
  }, []);

  useEffectV2(() => {
    fetchApi(params);
  }, [params]);

  const reload = () => {
    fetchApi(params);
  };

  return {
    data,
    isLoading,
    getAdminGradeList: fetchApi,
    reload,
  };
};

export default useGetAdminGradeList;
