import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { Fund } from '../types';

type GetAdminGetFundByIdParams = {
  fundId: string;
};

type GetAdminGetFundByIdResponse = {
  data: Fund;
};

type GetAdminGetFundByIdError = AxiosError;

const useAdminGetFundById = () => {
  const { fetchApi, data, isLoading } = useApi<
    GetAdminGetFundByIdParams,
    GetAdminGetFundByIdResponse,
    GetAdminGetFundByIdError
  >('adminGetFundById', ({ fundId }) => ({
    method: 'GET',
    url: `/api/funds/admin/${fundId}`,
  }));

  return {
    isLoading,
    data,
    fetchApi,
  };
};

export default useAdminGetFundById;
