import { useEffect } from 'react';
import useEffectV2 from '@share/hooks/useEffectV2';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getGradeListParamsAtom } from '../state';
import { GetGradeListData, GetGradeListParams } from '../types';

type GetGradeListDataParams = GetGradeListParams;

type GetGradeListDataResponse = {
  data: GetGradeListData;
  status: true;
};

type GetGradeListDataError = unknown;

const useGetGradeList = () => {
  const params = useRecoilValue(getGradeListParamsAtom);
  const resetParams = useResetRecoilState(getGradeListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    GetGradeListDataParams,
    GetGradeListDataResponse,
    GetGradeListDataError
  >('getGradeList', ({ page, limit, name, code, alumniId }) => ({
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
    getGradeList: fetchApi,
    reload,
  };
};

export default useGetGradeList;
