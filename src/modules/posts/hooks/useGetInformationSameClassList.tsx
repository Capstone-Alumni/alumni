import { AxiosError } from 'axios';
import { Information } from 'src/modules/profiles/types';
import useApi from 'src/modules/share/hooks/useApi';

type GetInformationSameClassListParams = {
  page: number;
  limit: number;
  classId: string;
};

type GetInformationSameClassListResponse = {
  data: {
    items: Information[];
    totalItems: number;
  };
};

type GetInformationSameClassListError = AxiosError;

const useGetInformationSameClassList = () => {
  const {
    fetchApi,
    data: apiData,
    isLoading,
  } = useApi<
    GetInformationSameClassListParams,
    GetInformationSameClassListResponse,
    GetInformationSameClassListError
  >('getInformationSameClassList', params => ({
    method: 'GET',
    url: '/api/users',
    params,
  }));

  return {
    data: apiData,
    fetchApi,
    isLoading,
  };
};

export default useGetInformationSameClassList;
