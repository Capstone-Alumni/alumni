import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { Job } from '../types';

type GetPublicGetJobByIdParams = {
  jobId: string;
};

type GetPublicGetJobByIdResponse = {
  data: Job;
};

type GetPublicGetJobByIdError = AxiosError;

const usePublicGetJobById = () => {
  const { fetchApi, data, isLoading } = useApi<
    GetPublicGetJobByIdParams,
    GetPublicGetJobByIdResponse,
    GetPublicGetJobByIdError
  >('publicGetJobById', ({ jobId }) => ({
    method: 'GET',
    url: `/api/recruitments/public/${jobId}`,
  }));

  return {
    isLoading,
    fetchApi,
    data,
  };
};

export default usePublicGetJobById;
