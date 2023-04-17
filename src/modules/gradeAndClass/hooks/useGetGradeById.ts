import useApi from 'src/modules/share/hooks/useApi';
import { Grade } from '../types';

type GetGradeByIdDataParams = unknown;

type GetGradeByIdDataResponse = {
  data: Grade;
};

type GetGradeByIdDataError = unknown;

const useGetGradeById = (id: string) => {
  const { fetchApi, data, isLoading } = useApi<
    GetGradeByIdDataParams,
    GetGradeByIdDataResponse,
    GetGradeByIdDataError
  >(`GetGradeById/${id}`, () => ({
    method: 'GET',
    url: `/api/grades/${id}`,
  }));

  return {
    isLoading,
    data,
    getGradeById: fetchApi,
  };
};

export default useGetGradeById;
