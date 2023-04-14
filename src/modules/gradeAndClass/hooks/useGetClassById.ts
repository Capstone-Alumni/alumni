import useApi from 'src/modules/share/hooks/useApi';
import { Class } from '../types';

type GetClassByIdDataParams = unknown;

type GetClassByIdDataResponse = {
  data: Class;
};

type GetClassByIdDataError = unknown;

const useGetClassById = (id: string) => {
  const { fetchApi, data, isLoading } = useApi<
    GetClassByIdDataParams,
    GetClassByIdDataResponse,
    GetClassByIdDataError
  >(`GetClassById/${id}`, () => ({
    method: 'GET',
    url: `/api/classes/${id}`,
  }));

  return {
    isLoading,
    data,
    getClassById: fetchApi,
  };
};

export default useGetClassById;
