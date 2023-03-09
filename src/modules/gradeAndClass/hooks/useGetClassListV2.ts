import useApi from 'src/modules/share/hooks/useApi';
import { GetClassListData } from '../types';

type GetClassListDataParams = { name: string; gradeId: string };

type GetClassListDataResponse = {
  data: GetClassListData;
  status: true;
};

type GetClassListDataError = unknown;

const useGetClassListV2 = () => {
  const { fetchApi, data, isLoading } = useApi<
    GetClassListDataParams,
    GetClassListDataResponse,
    GetClassListDataError
  >(
    'getClassListV2',
    ({ name, gradeId }) => ({
      method: 'GET',
      url: '/api/classes',
      params: {
        grade_id: gradeId,
        page: 1,
        limit: 999,
        name,
      },
    }),
    {
      revalidate: false,
    },
  );

  return {
    data,
    isLoading,
    getClassList: fetchApi,
  };
};

export default useGetClassListV2;
