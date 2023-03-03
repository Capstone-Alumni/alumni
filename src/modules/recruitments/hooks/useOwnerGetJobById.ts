import { AxiosError } from 'axios';
import useApi from 'src/modules/share/hooks/useApi';
import { Job } from '../types';

type GetOwnerGetJobByIdParams = {
  jobId: string;
};

type GetOwnerGetJobByIdResponse = {
  data: Job;
};

type GetOwnerGetJobByIdError = AxiosError;

const useOwnerGetJobById = () => {
  const { fetchApi, data, isLoading } = useApi<
    GetOwnerGetJobByIdParams,
    GetOwnerGetJobByIdResponse,
    GetOwnerGetJobByIdError
  >('ownerGetJobById', ({ jobId }) => ({
    method: 'GET',
    url: `/api/recruitments/owner/${jobId}`,
  }));

  return {
    isLoading,
    data,
    fetchApi,
  };
};

export default useOwnerGetJobById;
