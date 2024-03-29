import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { JobFormValues } from '../components/JobForm';

type OwnerUpdateJobByIdParams = {
  jobId: string;
} & JobFormValues;

type OwnerUpdateJobByIdResponse = unknown;

type OwnerUpdateJobByIdError = AxiosError;

const useOwnerUpdateJobById = () => {
  const router = useRouter();

  const { fetchApi, isLoading, error } = useApi<
    OwnerUpdateJobByIdParams,
    OwnerUpdateJobByIdResponse,
    OwnerUpdateJobByIdError
  >(
    'ownerUpdateJobById',
    ({ jobId, ...data }) => ({
      method: 'PUT',
      url: `/api/recruitments/owner/${jobId}`,
      data: data,
    }),
    {
      onError: () => {
        toast.error('Cập nhật công việc thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhật công việc thành công');
        router.push('/recruitments/posted_jobs');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
    error,
  };
};

export default useOwnerUpdateJobById;
