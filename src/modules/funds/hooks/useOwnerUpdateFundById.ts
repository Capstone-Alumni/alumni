import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';
import { FundFormValues } from '../components/FundForm';

type OwnerUpdateFundByIdParams = {
  fundId: string;
} & FundFormValues;

type OwnerUpdateFundByIdResponse = unknown;

type OwnerUpdateFundByIdError = AxiosError;

const useOwnerUpdateFundById = () => {
  const router = useRouter();

  const { fetchApi, isLoading } = useApi<
    OwnerUpdateFundByIdParams,
    OwnerUpdateFundByIdResponse,
    OwnerUpdateFundByIdError
  >(
    'ownerUpdateFundById',
    ({ fundId, ...data }) => ({
      method: 'PUT',
      url: `/api/funds/owner/${fundId}`,
      data: data,
    }),
    {
      onError: () => {
        toast.error('Cập nhật quỹ thất bại');
      },
      onSuccess: () => {
        toast.success('Cập nhật quỹ thành công');
        router.push('/admin/action/funds');
      },
    },
  );

  return {
    isLoading,
    fetchApi,
  };
};

export default useOwnerUpdateFundById;
