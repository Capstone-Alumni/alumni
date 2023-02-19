import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { Fund } from '../types';

type GetOwnerGetFundByIdParams = {
  fundId: string;
};

type GetOwnerGetFundByIdResponse = {
  data: Fund;
};

type GetOwnerGetFundByIdError = AxiosError;

const useOwnerGetFundById = () => {
  const { fetchApi, data, isLoading } = useApi<
    GetOwnerGetFundByIdParams,
    GetOwnerGetFundByIdResponse,
    GetOwnerGetFundByIdError
  >('ownerGetFundById', ({ fundId }) => ({
    method: 'GET',
    url: `/api/funds/owner/${fundId}`,
  }));

  return {
    isLoading,
    data,
    fetchApi,
  };
};

export default useOwnerGetFundById;
