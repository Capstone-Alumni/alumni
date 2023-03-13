import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type PublicApplyJobByIdParams = {
  jobId: string;
  resumeUrl: string;
};

type PublicApplyJobByIdResponse = unknown;

type PublicApplyJobByIdError = AxiosError;

const usePublicApplyJobById = () => {
  const { fetchApi, isLoading } = useApi<
    PublicApplyJobByIdParams,
    PublicApplyJobByIdResponse,
    PublicApplyJobByIdError
  >(
    'publicApplyJobById',
    ({ jobId, resumeUrl }) => ({
      method: 'POST',
      url: `/api/recruitments/public/${jobId}/applications`,
      data: { resumeUrl },
    }),
    {
      onError: () => {
        toast.error('Gửi hồ sơ thất bại');
      },
      onSuccess: () => {
        toast.success('Gửi hồ sơ thành công');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default usePublicApplyJobById;
