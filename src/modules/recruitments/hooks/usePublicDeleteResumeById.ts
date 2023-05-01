import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type PublicDeleteResumeByIdParams = {
  jobId: string;
  applicationId: string;
};

type PublicDeleteResumeByIdResponse = unknown;

type PublicDeleteResumeByIdError = AxiosError;

const usePublicDeleteResumeById = () => {
  const { fetchApi, isLoading, error } = useApi<
    PublicDeleteResumeByIdParams,
    PublicDeleteResumeByIdResponse,
    PublicDeleteResumeByIdError
  >(
    'publicDeleteResumeById',
    ({ jobId, applicationId }) => ({
      method: 'DELETE',
      url: `/api/recruitments/public/${jobId}/applications/${applicationId}`,
    }),
    {
      onError: () => {
        toast.error('Thu hồi hồ sơ thất bại');
      },
      onSuccess: () => {
        toast.success('Thu hồi hồ sơ thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
    error,
  };
};

export default usePublicDeleteResumeById;
