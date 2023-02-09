import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useApi from 'src/modules/share/hooks/useApi';

type VerifyAccountParams = {
  userId: string;
  fullName: string;
  classId: string;
  email: string;
};

type VerifyAccountResponse = unknown;

type VerifyAccountError = unknown;

const useVerifyAccount = () => {
  const router = useRouter();

  const { fetchApi, isLoading } = useApi<
    VerifyAccountParams,
    VerifyAccountResponse,
    VerifyAccountError
  >(
    'verifyAccount',
    ({ userId, classId, fullName, email }) => ({
      method: 'PUT',
      url: `/api/verify_account/${userId}`,
      data: {
        fullName,
        classId,
        email,
      },
    }),
    {
      onError: () => {
        toast.error('Nộp thông tin thất bại');
      },
      onSuccess: () => {
        toast.success('Thông tin của bạn đã được tiếp nhận');
        router.push('/');
      },
    },
  );

  return {
    isLoading,
    verifyAccount: fetchApi,
  };
};

export default useVerifyAccount;
