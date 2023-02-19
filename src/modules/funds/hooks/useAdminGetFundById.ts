import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';

type GetAdminGetFundByIdParams = {
  fundId: string;
};

type GetAdminGetFundByIdResponse = unknown;

type GetAdminGetFundByIdError = AxiosError;

const useAdminGetFundById = () => {
  const { fetchApi, isLoading } = useApi<
    GetAdminGetFundByIdParams,
    GetAdminGetFundByIdResponse,
    GetAdminGetFundByIdError
  >('adminGetFundById', ({ fundId }) => ({
    method: 'GET',
    url: `/api/funds/admin/${fundId}`,
  }));

  return {
    isLoading,
    fetchApi,
  };
};

export default useAdminGetFundById;
