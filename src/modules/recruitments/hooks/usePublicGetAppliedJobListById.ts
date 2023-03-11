import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { JobApplierInfo } from '../types';

type GetAppliedJobListByIdParams = {
  jobId: string;
};

export type GetAppliedJobListByIdResponse = {
  status: boolean;
  data: {
    totalItems: number;
    items: JobApplierInfo[];
    itemPerPage: number;
  };
};

type GetAppliedJobListByIdError = AxiosError;

const useOwnerGetAppliedJobListById = () => {
  const { fetchApi, data, isLoading, error } = useApi<
    GetAppliedJobListByIdParams,
    GetAppliedJobListByIdResponse,
    GetAppliedJobListByIdError
  >('getCandiatesAppliedJobListParams', ({ jobId }) => ({
    method: 'GET',
    url: `/api/recruitments/owner/${jobId}/application`,
  }));

  return {
    isLoading,
    data,
    fetchApi,
    error,
  };
};

export default useOwnerGetAppliedJobListById;
