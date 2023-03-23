import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { JobFormValues } from '../components/JobForm';

type CreateJobParams = JobFormValues;

type CreateJobResponse = unknown;

type CreateJobError = AxiosError;

const useCreateJob = () => {
  const router = useRouter();

  const { fetchApi, isLoading, error } = useApi<
    CreateJobParams,
    CreateJobResponse,
    CreateJobError
  >(
    'createJob',
    data => ({
      method: 'POST',
      url: '/api/recruitments',
      data: data,
    }),
    {
      onError: () => {
        toast.error('Yêu cầu tạo việc thất bại');
      },
      onSuccess: () => {
        toast.success(
          'Yêu cầu tạo việc thành công, xin vui lòng chờ xét duyệt',
        );
        // router.push('/Jobs/hosting');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
    error,
  };
};

export default useCreateJob;
