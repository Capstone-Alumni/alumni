import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useApi from 'src/modules/share/hooks/useApi';
import { getClassListParamsAtom } from '../state';
import { GetClassListData, GetClassListParams } from '../types';

type GetClassListDataParams = GetClassListParams;

type GetClassListDataResponse = {
  data: GetClassListData;
  status: true;
};

type GetClassListDataError = unknown;

const useGetClassList = (gradeId: string) => {
  const params = useRecoilValue(getClassListParamsAtom);

  const { fetchApi, data, isLoading } = useApi<
    GetClassListDataParams,
    GetClassListDataResponse,
    GetClassListDataError
  >(
    `getClassList/${gradeId}`,
    ({ page, limit, name }) => ({
      method: 'GET',
      url: '/api/classes',
      params: {
        grade_id: gradeId,
        page,
        limit,
        name,
      },
    }),
    {
      revalidate: false,
    },
  );

  useEffect(() => {
    fetchApi(params);
  }, [params]);

  const reload = () => {
    fetchApi(params);
  };

  return {
    data,
    isLoading,
    getClassList: fetchApi,
    reload,
  };
};

export default useGetClassList;
