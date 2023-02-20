import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { Fund } from '../types';

type GetPublicGetFundByIdParams = {
  fundId: string;
};

type GetPublicGetFundByIdResponse = {
  data: Fund;
};

type GetPublicGetFundByIdError = AxiosError;

const usePublicGetFundById = () => {
  const { fetchApi, data, isLoading } = useApi<
    GetPublicGetFundByIdParams,
    GetPublicGetFundByIdResponse,
    GetPublicGetFundByIdError
  >('publicGetFundById', ({ fundId }) => ({
    method: 'GET',
    url: `/api/funds/public/${fundId}`,
  }));

  return {
    isLoading,
    fetchApi,
    data,
  };
};

export default usePublicGetFundById;
