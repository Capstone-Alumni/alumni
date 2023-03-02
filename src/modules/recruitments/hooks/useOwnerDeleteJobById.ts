import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type OwnerDeleteJobByIdParams = {
  jobId: string;
};

type OwnerDeleteJobByIdResponse = unknown;

type OwnerDeleteJobByIdError = AxiosError;

const useOwnerDeleteJobById = () => {
  const { fetchApi, isLoading } = useApi<
    OwnerDeleteJobByIdParams,
    OwnerDeleteJobByIdResponse,
    OwnerDeleteJobByIdError
  >(
    'ownerDeleteJobById',
    ({ jobId }) => ({
      method: 'DELETE',
      url: `/api/recruitments/owner/${jobId}`,
    }),
    {
      onError: () => {
        toast.error('Xoá việc thất bại');
      },
      onSuccess: () => {
        toast.success('Xoá việc thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useOwnerDeleteJobById;
