import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type PublicUpdateResumeByIdParams = {
  jobId: string;
  applicationId: string;
  resumeUrl: string;
};

type PublicUpdateResumeByIdResponse = unknown;

type PublicUpdateResumeByIdError = AxiosError;

const usePublicUpdateResumeById = () => {
  const router = useRouter();

  const { fetchApi, isLoading, error } = useApi<
    PublicUpdateResumeByIdParams,
    PublicUpdateResumeByIdResponse,
    PublicUpdateResumeByIdError
  >(
    'publicUpdateResumeById',
    ({ jobId, applicationId, resumeUrl }) => ({
      method: 'PUT',
      url: `/api/recruitments/public/${jobId}/applications/${applicationId}`,
      data: { resumeUrl },
    }),
    {
      onError: () => {
        toast.error('Cập nhập CV thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhập CV thành công');
        router.push('/recruitments/applied');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
    error,
  };
};

export default usePublicUpdateResumeById;
